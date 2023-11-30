import time
from flask_cors import CORS


from flask import Flask, jsonify, request
from openai import OpenAI

app = Flask(__name__)
CORS(app)  # 添加这一行来允许所有来源的请求
client = OpenAI()

# 模拟一些聊天机器人的回复数据
responses = {
    "greetings": "Hello! How can I help you?",
    "bye": "Goodbye! Have a nice day.",
    # 其他回复
}

@app.route('/chat', methods=['POST'])
def chat():
    print("接口被请求")
    data = request.get_json()
    user_message = data.get('message')

    # 在这里根据用户的消息进行回复，这里只是简单地返回固定的回复，实际中会根据需求调用机器学习模型或其他服务来生成回复
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "system",
                   "content": "你是一位塔罗牌占卜师，你的任务是根据提问者的问题和为他们提供有益的建议。你的解答应基于对于塔罗牌的理解，同时也要尽可能地展现出乐观和积极的态度，引导卜卦者朝着积极的方向发展。"},
                  {"role": "user", "content": f"""
                    问题是：{user_message}"""}
                  ])
    print(response.choices[0].message.content)
    return jsonify({"message": response.choices[0].message.content})

if __name__ == '__main__':
    app.run(debug=True)
