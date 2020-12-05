import { Button, Card, CardContent, Chip, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import QuestionAnswerOutlinedIcon from '@material-ui/icons/QuestionAnswerOutlined';
import PermIdentityOutlinedIcon from '@material-ui/icons/PermIdentityOutlined';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbsUpDownOutlinedIcon from '@material-ui/icons/ThumbsUpDownOutlined';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Axios from 'axios';
const Hot = ({ auth }) => {
    const [question, setQuestion] = useState([])
    useEffect(() => {
        getAll()
    }, [])

    const getAll = () => {

        Axios.get('/api/question/sort')
            .then(res => {
                setQuestion(res.data)
            })
            .catch(err => {
                console.log(err);
            })
    }
    const up = (id) => {
        Axios.post(`/api/question/up/${id}`, { uid: auth.user.id })
            .then(res => {
                getAll()
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <div className="col-md-10 offset-md-1">
            {
                auth.isAuthenticated ?
                    <div className="text-right mt-5">
                        <Link to='/ask'>
                            <Button variant="contained" color="secondary" > Ask a question </Button>
                        </Link>
                    </div> : ''
            }
            {
                question.map(el => (
                    <div className="mt-5 ">
                        <Card>
                            <CardContent>
                                <Button variant="outlined" color="info"> {el.space} </Button>
                                <div className="d-flex mt-3">
                                    <Chip icon={<AccountCircleIcon />} label={`${el.creatorName}`} /> <Button>{el.time}</Button>
                                </div>
                                <Link to={`/details?id=${el._id}`}>
                                    <h4>{el.title} </h4>
                                    <Typography >{el.content}</Typography>
                                </Link>
                                <div className="d-flex mt-4">
                                    {
                                        auth.isAuthenticated ?
                                            <div>
                                                {
                                                    el.up.findIndex(el => (el === auth.user.id)) === -1 ?
                                                        <div>
                                                            <Button onClick={e => { up(el._id) }} variant="outlined" className="mr-3" color="primary" ><ThumbUpOutlinedIcon />  Upvote  ({el.up.length})</Button>:
                                                            <Button variant="outlined" color="primary" ><QuestionAnswerOutlinedIcon />  Answer ({el.answer.length})</Button>
                                                        </div> :
                                                        <div>
                                                            <Button variant="outlined" className="mr-3" color="primary" ><ThumbUpIcon />  Upvote  ({el.up.length})</Button>
                                                            <Button variant="outlined" color="primary" ><QuestionAnswerOutlinedIcon />  Answer ({el.answer.length})</Button>
                                                        </div>
                                                }
                                            </div> :
                                            <div>
                                                <Button onClick={e => { up(el._id) }} variant="outlined" className="mr-3" color="primary" ><ThumbsUpDownOutlinedIcon />  Upvote  ({el.up.length})</Button>:
                                                <Button variant="outlined" color="primary" ><QuestionAnswerOutlinedIcon />  Answer ({el.answer.length})</Button>
                                            </div>
                                    }
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                ))
            }
        </div>
    )
}
const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(mapStateToProps, null)(Hot)



