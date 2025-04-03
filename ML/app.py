import streamlit as st
import os
from Senti import extract_video_id, categorize_comments, bar_chart, plot_sentiment
from YoutubeCommentScrapper import save_video_comments_to_csv, get_channel_info, youtube, get_channel_id, get_video_stats

def delete_non_matching_csv_files(directory_path, video_id):
    for file_name in os.listdir(directory_path):
        if not file_name.endswith('.csv'):
            continue
        if file_name == f'{video_id}.csv':
            continue
        os.remove(os.path.join(directory_path, file_name))

st.set_page_config(page_title='Youtube Analyzer', page_icon='LOGO.png', initial_sidebar_state='auto')
st.sidebar.title("Sentimental Analysis")
st.sidebar.header("Enter YouTube Link")
youtube_link = st.sidebar.text_input("Link")
directory_path = os.getcwd()
hide_st_style = """
            <style>
            #MainMenu {visibility: hidden;}
            footer {visibility: hidden;}
            </style>
            """
st.markdown(hide_st_style, unsafe_allow_html=True)

if youtube_link:
    video_id = extract_video_id(youtube_link)
    channel_id = get_channel_id(video_id)
    if video_id:
        st.sidebar.write("The video ID is:", video_id)
        csv_file = save_video_comments_to_csv(video_id)
        delete_non_matching_csv_files(directory_path, video_id)
        st.sidebar.write("Comments saved to CSV!")
        st.sidebar.download_button(label="Download Comments", data=open(csv_file, 'rb').read(),
                                   file_name=os.path.basename(csv_file), mime="text/csv")

        # Channel info
        channel_info = get_channel_info(youtube, channel_id)
        
        col1, col2 = st.columns(2)
        with col1:
            st.image(channel_info['channel_logo_url'], width=250)
        with col2:
            st.title(' ')
            st.text("  YouTube Channel Name  ")
            st.title(channel_info['channel_title'])
            st.title("  ")

        st.title(" ")
        col3, col4, col5 = st.columns(3)
        with col3:
            st.header("  Total Videos  ")
            st.subheader(channel_info['video_count'])
        with col4:
            st.header("Channel Created ")
            st.subheader(channel_info['channel_created_date'][:10])
        with col5:
            st.header(" Subscriber_Count ")
            st.subheader(channel_info['subscriber_count'])

        st.title(" ")
        stats = get_video_stats(video_id)
        st.title("Video Information :")
        col6, col7, col8 = st.columns(3)
        with col6:
            st.header("  Total Views  ")
            st.subheader(stats["viewCount"])
        with col7:
            st.header(" Like Count ")
            st.subheader(stats["likeCount"])
        with col8:
            st.header(" Comment Count ")
            st.subheader(stats["commentCount"])

        st.header(" ")
        _, container, _ = st.columns([10, 80, 10])
        container.video(data=youtube_link)

        # Sentiment analysis and categorization
        results = categorize_comments(csv_file)

        st.title("Sentiment Analysis")
        col9, col10, col11 = st.columns(3)
        with col9:
            st.header(f"Positive Comments ✅ ({len(results['positive'])})")
            with st.expander("See comments"):
                for comment in results['positive']:
                    st.write(comment)
        with col10:
            st.header(f"Negative Comments ❌ ({len(results['negative'])})")
            with st.expander("See comments"):
                for comment in results['negative']:
                    st.write(comment)
        with col11:
            st.header(f"Neutral Comments ({len(results['neutral'])})")
            with st.expander("See comments"):
                for comment in results['neutral']:
                    st.write(comment)

        bar_chart(len(results['positive']), len(results['negative']), len(results['neutral']))
        plot_sentiment(len(results['positive']), len(results['negative']), len(results['neutral']))

        # Additional categories
        st.title("Comment Categories")
        st.subheader(f"Question-Based Comments ❓ ({len(results['questions'])})")
        with st.expander("See comments"):
            for comment in results['questions']:
                st.write(comment)

        st.subheader(f"Request Comments 🙏 ({len(results['requests'])})")
        with st.expander("See comments"):
            for comment in results['requests']:
                st.write(comment)

        st.subheader(f"Promotional/Spam Comments 🚨 ({len(results['spam'])})")
        with st.expander("See comments"):
            for comment in results['spam']:
                st.write(comment)

        st.subheader(f"Engagement & Generic Comments 🗨️ ({len(results['generic'])})")
        with st.expander("See comments"):
            for comment in results['generic']:
                st.write(comment)

        st.subheader("Channel Description")
        st.write(channel_info['channel_description'])
    else:
        st.error("Invalid YouTube link")