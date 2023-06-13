import requests
from bs4 import BeautifulSoup
import sys
import validators
from urllib.parse import quote
import json


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
    for script in soup.find_all("script", type="application/ld+json"):
        # load json into a dictionary
        json_dict = json.loads(script.contents[0])
    # fill dictionary with json data
    try:
        temp = json_dict[0]
        rating_val = json_dict[0].get('aggregateRating')['ratingValue']
        rec_course = json_dict[0].get('recipeCourse')
        rec_category = json_dict[0].get('recipeCategory')[0]
        rec_serving = json_dict[0].get('servingSize')
        cont = True
    except:
        cont = False
    """
    prep_time = json_dict[0].get('prepTime')
    cook_time = json_dict[0].get('cookTime')
    """

    if cont is True:
        if rating_val is not None:
            result_dict['rating'] = rating_val
        if rec_course is not None:
            result_dict['course'] = rec_course
        if rec_category is not None:
            result_dict['category'] = rec_category
        if rec_serving is not None:
            result_dict['servingSize'] = rec_serving
        """ TODO: format prepTime and cookTime so that they can be added
                to compute the total time
        """
        """
        if prep_time is not None:
            result_dict['prepTime'] = prep_time
        if cook_time is not None:
            result_dict['cookTime'] = cook_time
        result_dict['totalTime'] = json_dict[0].get('prepTime') \
            + json_dict[0].get('cookTime')
        """

        """ TODO: recipe instructions could be stored as an array or a string """
        result_str = ""
        # ----result_dict['instructions'] = []
        temp = json_dict[0].get('recipeInstructions')
        for index in range(len(temp)):
            # ----result_dict['instructions'].append(temp[index]['text'])
            result_str += temp[index]['text'] + '\n'
        # store the instructions as a string
        if len(result_str) > 0:
            result_dict['instructions'] = result_str

        temp = json_dict[0].get('recipeIngredient')
        result_str = ""
        for index in range(len(temp)):
            result_str += temp[index] + ',\n'
        # store the ingredients as a string
        if len(result_str) > 0:
            result_dict['ingredients'] = result_str

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
        print(parse_html(from_url_to_html(sys.argv[1], 'file.html')))
    else:
        print('url is invalid')
    sys.stdout.flush()


if __name__ == "__main__":
    main()
