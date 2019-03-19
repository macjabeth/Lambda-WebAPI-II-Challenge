import React from 'react'
import { connect } from 'react-redux';
import styled from 'styled-components';

const App = ({ posts }) => {
  return (
    <AppContainer>
      {posts.length
        ? (
          <PostsContainer>
            {posts.map(post => (
              <div>
                <h5>{post.title}</h5>
                <p>{post.contents}</p>
              </div>
            ))}
          </PostsContainer>
        ) : (
          <h1>Loading...</h1>
        )
      }
    </AppContainer>
  )
}

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 25px;
`;

const PostsContainer = styled.div`
  max-width: 550px;

  h5 {
    font-weight: bold;
  }

  p {
    margin-bottom: 15px;

    &::before {
      content: ' - '
    }
  }
`;

const mapStateToProps = state => ({
  posts: state.posts
});

export default connect(mapStateToProps)(App);
