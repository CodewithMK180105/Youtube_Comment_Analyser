import csv
import re
import pandas as pd
import nltk
nltk.download('vader_lexicon')
from nltk.sentiment.vader import SentimentIntensityAnalyzer
import plotly.express as px
import plotly.graph_objects as go
from colorama import Fore, Style
from typing import Dict

def extract_video_id(youtube_link):
    video_id_regex = r"^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu.be\/)([a-zA-Z0-9_-]{11})"
    match = re.search(video_id_regex, youtube_link)
    if match:
        video_id = match.group(1)
        return video_id
    else:
        return None

def categorize_comments(csv_file):
    sid = SentimentIntensityAnalyzer()
    comments = []
    with open(csv_file, 'r', encoding='utf-8-sig') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            comments.append(row['Comment'])

    positive = []
    negative = []
    neutral = []
    questions = []
    requests = []
    spam = []
    generic = []

    for comment in comments:
        sentiment_scores = sid.polarity_scores(comment)
        # Sentiment classification
        if sentiment_scores['compound'] > 0.05:
            positive.append(comment)
        elif sentiment_scores['compound'] < -0.05:
            negative.append(comment)
        else:
            neutral.append(comment)
            # Generic: neutral comments that aren't questions, requests, or spam
            if not is_question(comment) and not is_request(comment) and not is_spam(comment):
                generic.append(comment)

        # Additional categorizations (independent of sentiment)
        if is_question(comment):
            questions.append(comment)
        if is_request(comment):
            requests.append(comment)
        if is_spam(comment):
            spam.append(comment)

    results = {
        'positive': positive,
        'negative': negative,
        'neutral': neutral,
        'questions': questions,
        'requests': requests,
        'spam': spam,
        'generic': generic
    }
    return results

def is_question(comment):
    question_words = ['what', 'why', 'how', 'when', 'where', 'who', 'which', 'whose', 'whom']
    if '?' in comment:
        return True
    first_word = comment.split()[0].lower() if comment.split() else ''
    return first_word in question_words

def is_request(comment):
    request_keywords = ['please', 'can you', 'could you', 'i request', 'i wish', 'would you', 'may i ask']
    comment_lower = comment.lower()
    return any(keyword in comment_lower for keyword in request_keywords)

def is_spam(comment):
    if re.search(r'http[s]?://', comment):  # Check for URLs
        return True
    uppercase_count = sum(1 for c in comment if c.isupper())
    return uppercase_count / len(comment) > 0.5 if comment else False  # Excessive capitalization

# Senti.py (partial update)
def bar_chart(positive_count, negative_count, neutral_count):
    return {
        "sentiment": ["Positive", "Negative", "Neutral"],
        "counts": [positive_count, negative_count, neutral_count]
    }

def plot_sentiment(positive_count, negative_count, neutral_count):
    return {
        "labels": ["Positive", "Negative", "Neutral"],
        "values": [positive_count, negative_count, neutral_count]
    }

def create_scatterplot(csv_file: str, x_column: str, y_column: str) -> None:
    data = pd.read_csv(csv_file)
    fig = px.scatter(data, x=x_column, y=y_column, color='Category')
    fig.update_layout(
        title='Scatter Plot',
        xaxis_title=x_column,
        yaxis_title=y_column,
        font=dict(size=18)
    )
    st.plotly_chart(fig, use_container_width=True)

def print_sentiment(csv_file: str) -> None:
    results = categorize_comments(csv_file)
    num_positive = len(results['positive'])
    num_negative = len(results['negative'])
    if num_positive > num_negative:
        overall_sentiment = 'POSITIVE'
        color = Fore.GREEN
    elif num_negative > num_positive:
        overall_sentiment = 'NEGATIVE'
        color = Fore.RED
    else:
        overall_sentiment = 'NEUTRAL'
        color = Fore.YELLOW
    print('\n' + Style.BRIGHT + color + overall_sentiment.upper().center(50, ' ') + Style.RESET_ALL)