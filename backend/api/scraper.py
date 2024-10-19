import os
from dotenv import load_dotenv
from scrapegraphai.graphs import SmartScraperGraph

# Load environment variables from .env
load_dotenv()

def run_scraper():
    openai_key = os.getenv("OPENAI_APIKEY")

    graph_config = {
        "llm": {
            "api_key": openai_key,
            "model": "openai/gpt-3.5-turbo",
        },
    }

    smart_scraper_graph = SmartScraperGraph(
        prompt="ask any question.",
        source="https://github.com/topics",
        config=graph_config
    )

    result = smart_scraper_graph.run()
    return result