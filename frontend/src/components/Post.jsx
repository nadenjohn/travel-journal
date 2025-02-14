import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import formatDistance from 'date-fns/formatDistance';
const Post = ({ post, showUsername, fromFavoritePostPage }) => {
  if (!post) {return}
  // Get the post author name
  const author = showUsername ? 
                  (fromFavoritePostPage ?
                    post.post? ` - Author: ${post.post.author.firstName} ${post.post.author.lastName}`:''
                    : 
                    post.author? ` - Author: ${post.author.firstName} ${post.author.lastName}`:'')
                  :'';

  const postId = fromFavoritePostPage ? post.post._id : post._id;
  const title = fromFavoritePostPage ? post.post.title : post.title;
  const image = fromFavoritePostPage ? post.post.image : post.image;
  
  const postDate = post.updatedAt ? `Last modified: ${formatDistance(new Date(post.updatedAt), new Date())}` : '';
  
  return (
    <Card className='mb-2'>
      <Link to={`/postDetail/${postId}`}>
        {image ? <Card.Img src = {image} alt={title} className="w-100" /> : ''}
      </Link>

      <Card.Body>
        <Link to={`/postDetail/${postId}`}>
          <Card.Title>{title}</Card.Title>
        </Link>
        <Card.Text>
          {postDate}
          {author}
        </Card.Text>
      </Card.Body>
    </Card>
  )
}
// Define proptypes for post, showUsername, fromFavoritePostPage
Post.propTypes = {
  post: PropTypes.object.isRequired,
  showUsername: PropTypes.bool.isRequired,
  fromFavoritePostPage: PropTypes.bool.isRequired,
}

export default Post
