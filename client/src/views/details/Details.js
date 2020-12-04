import { Button, Card, CardContent, Chip, Typography } from '@material-ui/core'
import React from 'react'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
const Details = () => {
    return (
        <div className="col-md-10 offset-md-1 mt-5">
            <Card>
                <CardContent>
                    <Button variant="outlined" color="info"> Javascript </Button>
                    <div className="d-flex mt-3">
                    <Chip icon={<AccountCircleIcon />} label="Alamin"/> <Button>2-04-2020</Button>
                    </div>
                    <h4>What is  your name  ? </h4>
                    <Typography >The 'aid' is the identification of this answer. The 'qid' shows that this answer is for the question identified "qid1". The 'content' field is for the content of this answer. The 'uid' and 'uname'show the identity and name of the answerer</Typography>
                </CardContent>
            </Card>
            <div style={{ paddingLeft: '30px' }}>
                <div className="mt-2">
                    <Card>
                        <CardContent>
                            <div className="d-flex mt-3">
                            <Chip icon={<AccountCircleIcon />} label="Alamin"/> <Button>2-04-2020</Button>
                            </div>
                            <Typography >The 'aid' is the identification of eld is for the content of this answer. The 'uid' and 'uname'show the identity and name of the answerer</Typography>
                        </CardContent>
                    </Card>
                </div>
                <div className="mt-2">
                    <Card>
                        <CardContent>
                            <div className="d-flex mt-3">
                            <Chip icon={<AccountCircleIcon />} label="Alamin"/> <Button>2-04-2020</Button>
                            </div>
                            <Typography >The 'aid' is the identification of eld is for the content of this answer. The 'uid' and 'uname'show the identity and name of the answerer</Typography>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default Details
