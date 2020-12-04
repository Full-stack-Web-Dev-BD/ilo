import { Button, Card, CardContent, Chip, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import QuestionAnswerOutlinedIcon from '@material-ui/icons/QuestionAnswerOutlined';
import PermIdentityOutlinedIcon from '@material-ui/icons/PermIdentityOutlined';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import { Link } from 'react-router-dom';
const Home = () => {
    const [question, setQuestion] = useState([])
    useEffect(() => {
        setQuestion(['w2', 'w2', 'w2', 'w2', 'w2', 'w2', 'w2', 'w2', 'w2', 'w2', 'w2', 'w2', 'w2', 'w2', 'w2', 'w2', 'w2'])
    }, [])

    return (
        <div className="col-md-10 offset-md-1">
            <div className="text-right mt-5">
                <Button variant="contained" color="secondary" > Ask a question </Button>
            </div>
            {
                question.map(el => (
                    <Link to='/details'>
                    <div className="mt-5 ">
                        <Card>
                            <CardContent>
                                <Button variant="outlined" color="info"> Javascript </Button>
                                <div className="d-flex mt-3">
                                <Chip icon={<AccountCircleIcon />} label="Alamin"/> <Button>2-04-2020</Button>
                                </div>
                                <h4>What is  your name  ? </h4>
                                <Typography >The 'aid' is the identification of this answer. The 'qid' shows that this answer is for the question identified "qid1". The 'content' field is for the content of this answer. The 'uid' and 'uname'show the identity and name of the answerer</Typography>
                                <div className="d-flex mt-4">
                                    <Button variant="outlined" className="mr-3" color="primary" ><ThumbUpOutlinedIcon />  Upvote (40)</Button>
                                    <Button variant="outlined" color="primary" ><QuestionAnswerOutlinedIcon />  Answer (40)</Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                    </Link>
                ))
            }
        </div>
    )
}

export default Home
