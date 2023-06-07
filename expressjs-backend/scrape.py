import requests
from bs4 import BeautifulSoup
import sys
import validators
from urllib.parse import quote


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


def parse_html(file_in: str) -> dict:
    """ given an html file, returns the desired information """
    with open(file_in, "r", encoding='utf-8') as fp:
        contents = fp.read()
        soup = BeautifulSoup(contents, "html.parser")
    # store the target data into a list
    result_dict = dict()
    """for script in soup.find_all("script", type="application/ld+json"):
        # load json into a dictionary
        json_dict = json.loads(script.contents[0])"""
    # fill dictionary with json data
    """
    result_dict['name'] = json_dict[0].get('headline')
    result_dict['source'] = json_dict[0].get('url')
    result_dict['image'] = json_dict[0].get('image')['url']
    result_dict['rating'] = json_dict[0].get('aggregateRating')['ratingValue']
    result_dict['course'] = json_dict[0].get('recipeCourse')
    result_dict['category'] = json_dict[0].get('recipeCategory')[0]
    result_dict['servingSize'] = json_dict[0].get('')
    result_dict['prepTime'] = json_dict[0].get('prepTime')
    result_dict['cookTime'] = json_dict[0].get('cookTime')
    result_dict['totalTime'] = json_dict[0].get('prepTime') +
                               json_dict[0].get('cookTime')
    result_dict['description'] = json_dict[0].get('description')
    result_dict['instructions'] = []
    temp = json_dict[0].get('recipeInstructions')
    for index in range(len(temp)):
        result_dict['instructions'].append(temp[index]['text'])
    result_dict['ingredients'] = json_dict[0].get('recipeIngredient')
    """
    # TEMPORARY: fill dictionary with metadata
    for tag in soup.find_all("meta"):
        if tag.get("property", None) == "og:title":
            result_dict['name'] = tag.get("content", None)
        elif tag.get("property", None) == "og:url":
            result_dict['source'] = tag.get("content", None)
        elif tag.get("property", None) == "og:image":
            result_dict['image'] = tag.get("content", None)
        elif tag.get("property", None) == "og:image:width":
            result_dict['image width'] = tag.get("content", None)
        elif tag.get("property", None) == "og:image:height":
            result_dict['image height'] = tag.get("content", None)
        elif tag.get("property", None) == "og:image:type":
            result_dict['image type'] = tag.get("content", None)
        elif tag.get("property", None) == "og:description":
            result_dict['description'] = quote(tag.get("content", None))

    """for entry in result_dict:
        print(entry, "\n", result_dict[entry], "\n\n")"""

    return result_dict


def extract(url: str) -> dict:
    result = parse_html(from_url_to_html(url, "output_file"))
    return result


def main():
    # validate the url
    if validators.url(sys.argv[1]):
        # parse information given url
        print(parse_html(from_url_to_html(sys.argv[1], 'file.html')))
    else:
        print('url is invalid')
    sys.stdout.flush()


if __name__ == "__main__":
    main()
