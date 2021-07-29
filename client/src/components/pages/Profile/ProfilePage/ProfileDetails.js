import { Component } from 'react'
import { Container, Row, Col, Card, Image, Modal } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import ProfileForm from './ProfileForm'
import ProfileService from './../../../../services/profile.service'
import Spinner from './../../../shared/Spinner/Spinner'

class ProfileDetails extends Component {

    constructor() {
        super()
        this.state = {
            profile: undefined,
            modal: false,
            wallet: undefined
        }
        this.profileService = new ProfileService()
    }

    loadProfileDetails() {

        this.profileService
            .profile(this.state)
            .then(response => {
                this.setState({ profile: response.data })
                console.log(this.state.profile)
            })
            .catch(err => this.props.showMessage(err.response.data.message))

    }

    loadWalletBalance = () => {
        this.profileService
            .profileWallet()
            .then(response => {
                this.setState({ wallet: response.data.balance })
                console.log(response.data)
            })
            .catch(err => this.props.showMessage(err.response.data.message))
    }

    componentDidMount() {
        this.loadProfileDetails()
        this.loadWalletBalance()
    }


    render() {

        return (

            <Container>

                {!this.state.profile
                    ?
                    <Spinner />
                    :
                    <>
                        <Row className="justify-content-around">

                            <Col md={4}>
                                <Image src={this.state.profile.image} />
                            </Col>

                            <Col md={4}>

                                <h1>{this.state.profile.name} {this.state.profile.lastName}</h1>
                                <h5>{this.state.profile.DNI}</h5>
                                <ul>
                                    <li>{this.state.profile.mail}</li>
                                    <li>{this.state.profile.phone}</li>
                                    <li>{this.state.profile.role}</li>
                                </ul>
                                <Link onClick={() => this.setState({ modal: true })}>Editar perfil</Link>


                            </Col>
                            <Card className="food-card">

                                <Card.Body>
                                    <Card.Title>{this.state.wallet}</Card.Title>

                                </Card.Body>
                            </Card>
                        </Row>

                        <Modal show={this.state.modal} onHide={() => this.setState({ modal: false })}>
                            <Modal.Body>
                                <ProfileForm refreshProfile={() => this.loadProfileDetails()} profile={this.state.profile} key={this.state.profile._id} closeModal={() => this.setState({ modal: false })} />
                            </Modal.Body>
                        </Modal>
                    </>
                }

            </Container>
        )
    }
}


export default ProfileDetails