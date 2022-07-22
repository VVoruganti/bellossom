from dotenv import load_dotenv
from bs4 import BeautifulSoup
import requests
# from notion_client import Client

links = ["https://linktr.ee/rohitgijare", "https://linktr.ee/vinihazari", "https://linktr.ee/imanesmail"]

for link in links:
    page = requests.get(link)
    soup = BeautifulSoup(page.content, "html.parser")
    for a_href in soup.find_all("a", href=True):
        print(a_href["href"])
    print("-----")
