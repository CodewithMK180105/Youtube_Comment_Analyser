from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import os
from Senti import extract_video_id, categorize_comments
from YoutubeCommentScrapper import save_video_comments_to_csv, get_channel_info, youtube, get_channel_id, get_video_stats
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

def delete_non_matching_csv_files(directory_path, video_id):
    for file_name in os.listdir(directory_path):
        if not file_name.endswith('.csv') or file_name == f'{video_id}.csv':
            continue
        os.remove(os.path.join(directory_path, file_name))

@app.route("/analyze", methods=["POST"])
def analyze_youtube():
    data = request.get_json()
    if not data or "link" not in data:
        return jsonify({"error": "Missing YouTube link"}), 400

    youtube_link = data["link"]
    video_id = extract_video_id(youtube_link)
    
    if not video_id:
        return jsonify({"error": "Invalid YouTube link"}), 400

    directory_path = os.getcwd()
    channel_id = get_channel_id(video_id)
    csv_file = save_video_comments_to_csv(video_id)
    delete_non_matching_csv_files(directory_path, video_id)

    # Channel info
    channel_info = get_channel_info(youtube, channel_id)
    video_stats = get_video_stats(video_id)
    sentiment_results = categorize_comments(csv_file)

    # Prepare response data
    response = {
        "video_id": video_id,
        "csv_file": csv_file,
        "channel_info": channel_info,
        "video_stats": video_stats,
        "sentiment": {
            "positive": {"count": len(sentiment_results["positive"]), "comments": sentiment_results["positive"]},
            "negative": {"count": len(sentiment_results["negative"]), "comments": sentiment_results["negative"]},
            "neutral": {"count": len(sentiment_results["neutral"]), "comments": sentiment_results["neutral"]},
            "questions": {"count": len(sentiment_results["questions"]), "comments": sentiment_results["questions"]},
            "requests": {"count": len(sentiment_results["requests"]), "comments": sentiment_results["requests"]},
            "spam": {"count": len(sentiment_results["spam"]), "comments": sentiment_results["spam"]},
            "generic": {"count": len(sentiment_results["generic"]), "comments": sentiment_results["generic"]},
        },
        "charts": {
            "bar": {
                "sentiment": ["Positive", "Negative", "Neutral"],
                "counts": [len(sentiment_results["positive"]), len(sentiment_results["negative"]), len(sentiment_results["neutral"])]
            },
            "pie": {
                "labels": ["Positive", "Negative", "Neutral"],
                "values": [len(sentiment_results["positive"]), len(sentiment_results["negative"]), len(sentiment_results["neutral"])]
            }
        }
    }
    return jsonify(response), 200

@app.route("/download/<video_id>", methods=["GET"])
def download_comments(video_id):
    csv_file = f"{video_id}.csv"
    if os.path.exists(csv_file):
        return send_file(csv_file, mimetype="text/csv", as_attachment=True, download_name=csv_file)
    return jsonify({"error": "CSV file not found"}), 404

if __name__ == "__main__":
    app.run(debug=True, port=5000)
