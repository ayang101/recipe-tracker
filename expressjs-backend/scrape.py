import requests
from bs4 import BeautifulSoup
import sys
import validators
from urllib.parse import quote
from recipe_scrapers import scrape_me

NOT_FOUND_MSG = ''


def from_url_to_html(url: str, file_in: str) -> str:
    """ given a url, returns the url's html file"""
    # specify user-agent to have access to scrape website
    response = requests.get(url, headers={'User-Agent':
                            'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:50.0)' +
                                          'Gecko/20100101 Firefox/50.0'})
    soup = BeautifulSoup(response.content, "html.parser")
    # write html to a new file
    with open(file_in, "w", encoding='utf-8') as file:
        file.write(str(soup.prettify()))
    return file.name


def format_times(minutes: int) -> str:
    result = ''
    num_hours = 0
    num_minutes = 0

    num_hours = minutes // 60
    num_minutes = minutes % 60

    if num_hours > 0:
        if num_hours > 1:
            result += str(num_hours) + ' hours '
        else:
            result += str(num_hours) + ' hour '
    if num_minutes > 1 or (num_minutes == 0 and len(result) == 0):
        result += str(num_minutes) + ' minutes'
    if num_minutes == 1:
        result += str(num_minutes) + ' minute'
    return result


def parse_html(url: str, file_in: str) -> dict:
    """ given an html file, returns the desired information """
    with open(file_in, "r", encoding='utf-8') as fp:
        contents = fp.read()
        soup = BeautifulSoup(contents, "html.parser")
    # store the target data into a list
    result_dict = dict()

    # using recipe-scrapers tool
    scraper = scrape_me(url)
    try:
        result_dict['rating'] = scraper.ratings()
    except:
        pass
    try:
        result_dict['course'] = scraper.category()
    except:
        pass
    try:
        result_dict['cuisine'] = scraper.cuisine()
    except:
        pass
    try:
        # cuisine of food includes fruits, vegetables, grains, protein, and dairy
        # result_dict['cuisine'] = scraper.cuisine()
        serving_size = scraper.yields().split()[0]
        result_dict['servingSize'] = serving_size
    except:
        pass
    try:
        result_dict['prepTime'] = format_times(int(scraper.prep_time()))
    except:
        pass
    try:
        result_dict['cookTime'] = format_times(int(scraper.cook_time()))
    except:
        pass
    try:
        temp = int(scraper.total_time()) - (int(scraper.prep_time())
                                            + int(scraper.cook_time()))
        result_dict['additionalTime'] = format_times(temp)
    except:
        pass
    try:
        result_dict['totalTime'] = format_times(int(scraper.total_time()))
    except:
        pass
    try:
        result_dict['author'] = scraper.author()
    except:
        pass
    try:
        result_dict['instructions'] = scraper.instructions().split('\n')
    except:
        pass
    try:
        result_dict['ingredients'] = scraper.ingredients()
    except:
        pass

    # fill dictionary with metadata
    for tag in soup.find_all("meta"):
        if tag.get("property", None) == "og:title":
            result_dict['name'] = tag.get("content", None)
        elif tag.get("property", None) == "og:url":
            result_dict['source'] = quote(tag.get("content", None))
        elif tag.get("property", None) == "og:image":
            result_dict['image'] = quote(tag.get("content", None))
        elif tag.get("property", None) == "og:description":
            result_dict['description'] = quote(tag.get("content", None))

    return result_dict


def extract(url: str) -> dict:
    result = parse_html(from_url_to_html(url, "output_file"))
    return result


def main():
    # validate the url
    if validators.url(sys.argv[1]):
        # parse information given url
        print(parse_html(sys.argv[1],
                         from_url_to_html(sys.argv[1], 'file.html')))
    else:
        print('url is invalid')
    sys.stdout.flush()


if __name__ == "__main__":
    main()
