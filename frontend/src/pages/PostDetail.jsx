import { useEffect, useState } from "react";
import axios from 'axios';
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from 'react-redux';
import { toast } from "react-toastify";
import formatDistance from 'date-fns/formatDistance';
// import PropTypes from 'prop-types';

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({});
  const { user } = useSelector((state) => state.auth);
  
  useEffect(() => {
    if (!id) { return }
    axios
      .get(`/api/posts/post/${id}`)
      .then(res => setPost(res.data[0]))
      .catch(err => {
        toast.error(err)
      });
  }, [id]);

  const addMyFavoritePost = async () => {
    if (!id || !user) {
      toast.error('Post Id and user id are required');
    } else {
      const data = {id, user};
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      axios
        .post('/api/myFavoritePosts/', data, config)
        .then(res => {
          toast.success('The task has been done. Please visit your favorire posts page.');
          return res.data
        })
        .catch(err => 
          {
            if(err.response && err.response.status===400) {
              toast.error('The post already exists in your favorite post collection.');
            };
          });
    }
  };

  return (
    <Container fluid>
      <div className='title bottom__line'>{post.title}</div>
      <Row>
        <Col>
          <Card className='mb-2'>
            {post.image ? <Card.Img src = {`/${post.image}`} alt={post.title} /> : ''}
            <Card.Body>
              <Card.Text>
                {post.updatedAt? `Last modified: ${formatDistance(new Date(post.updatedAt), new Date())}`:''}
                {post.author ? ` - Author: ${post.author.firstName} ${post.author.lastName}`:''}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card.Text>
            Location: {post.city} - {post.country}
          </Card.Text>
          <Card.Text>
            {post.content}
          </Card.Text>
          <Card.Text>
            Price for a night: * AirBnB: {post.airBnBPrice} - * Hotel Price: {post.hotelPrice}
          </Card.Text>
          <Card.Text>
            Price for a round trip: * Couple: {post.couplePrice} - * Family: {post.familyPrice}
          </Card.Text>
        </Col>
      </Row>
      <Button variant="outline-primary" type="submit" onClick={()=> navigate('/')}>
        Back to Home Page
      </Button>{"  "}
      {user ? (
        <Button variant="outline-primary" type="submit" onClick={addMyFavoritePost}>
          Add to My Favorite Posts
        </Button>
        ) : ('')
      }

    </Container>
  )
}

// PostDetail.propTypes = {
//   userMode: PropTypes.bool.isRequired
// }

export default PostDetail