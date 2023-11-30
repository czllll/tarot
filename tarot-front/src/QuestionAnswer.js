import React, { useState } from 'react';

function QuestionAnswer() {
  const [question, setQuestion] = useState('');
  const [dialogue, setDialogue] = useState([]);

  const handleQuestionSubmit = () => {
    if (question.trim() !== '') {
      setDialogue([...dialogue, { role: 'user', content: question }]);
      // 在此处处理问题并获取回答，可以使用异步函数或 API 请求
      // 将回答添加到对话列表中
      // 示例：setDialogue([...dialogue, { role: 'assistant', content: answer }]);
      setQuestion('');
    }
  };

  return (
    <div className="question-answer-container">
      <div className="dialogue-box">
        {dialogue.map((message, index) => (
          <div key={index} className={message.role}>
            {message.content}
          </div>
        ))}
      </div>
      <input
        type="text"
        placeholder="输入你的问题"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <button onClick={handleQuestionSubmit}>发送</button>
    </div>
  );
}

export default QuestionAnswer;