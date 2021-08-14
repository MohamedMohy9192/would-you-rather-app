import React, { Component } from 'react';
import { connect } from 'react-redux';
import Question from './Question';

class Dashboard extends Component {
  state = {
    tabName: 'unansweredQuestions',
  };

  handleSwitchTabs = (tabName) => {
    this.setState(() => ({
      tabName,
    }));

    console.log('')
  };

  render() {
    const { unAnsweredQuestionsIds, answeredQuestionsIds } = this.props;
    return (
      <div>
        <h1>Dashboard</h1>

        <button onClick={() => this.handleSwitchTabs('unansweredQuestions')}>
          Unanswered Questions
        </button>
        <button onClick={() => this.handleSwitchTabs('answeredQuestions')}>
          Answered Questions
        </button>

        {this.state.tabName === 'unansweredQuestions' ? (
          <ul>
            {unAnsweredQuestionsIds.map((questionId) => (
              <li key={questionId}> {<Question id={questionId} />}</li>
            ))}
          </ul>
        ) : (
          <ul>
            {answeredQuestionsIds.map((questionId) => (
              <li key={questionId}>{<Question id={questionId} />}</li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}

function mapStateToProps({ users, questions, authedUser }) {
  const currentUser = users[authedUser];
  const answeredQuestionsIds = Object.keys(currentUser.answers).sort(
    (a, b) => questions[b].timestamp - questions[a].timestamp
  );

  const allQuestionsIds = Object.keys(questions).sort(
    (a, b) => questions[b].timestamp - questions[a].timestamp
  );

  const unAnsweredQuestionsIds = allQuestionsIds.filter(
    (questionId) => !answeredQuestionsIds.includes(questionId)
  );

  return {
    unAnsweredQuestionsIds,
    answeredQuestionsIds,
  };
}

export default connect(mapStateToProps)(Dashboard);
