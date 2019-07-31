import React, { Component } from 'react'

import './Camera.css'
import '../Base/Base.css'

class Camera extends Component {
    constructor(props) {
        super(props);

        this.getComponentSize = this.getComponentSize.bind(this);
        const { raftId } = this.props;
        this.state = {
            size: {
                height: 0,
                width: 0
            },
            image_url: "http://uoccya.ise-hp.com/cages/lastimg/" + raftId,
            getRaftImageInterval: null
        }
    }

    componentDidMount() {
        this.streamRaftImage();
        this.getComponentSize();
    }

    componentWillMount() {
        window.addEventListener('resize', this.getComponentSize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.getComponentSize);
        clearInterval(this.state.getRaftImageInterval);
    }

    streamRaftImage() {
        const { raftId } = this.props;
        this.state.getRaftImageInterval = setInterval(function () {
            this.setState({
                image_url: "http://uoccya.ise-hp.com/cages/lastimg/" + raftId + '?' + new Date()
            });
        }.bind(this), 5000);
    }

    getComponentSize() {
        let height = document.getElementById('seesea-camera').clientHeight;
        let width = document.getElementById('seesea-camera').clientWidth;
        this.setState({
            size: {
                height: height,
                width: width
            }
        });
    }

    render() {
        let height = this.state.size.height;
        let width = this.state.size.width;
        const { image_url } = this.state;
        return (
            <div id="seesea-camera" className='base'>
                <span className='base-title-large'>カメラ</span>
                <img
                    id="canvas"
                    src={image_url}
                    style={{
                        marginTop: 50,
                        marginLeft: "auto",
                        marginRight: "auto",
                        height: height - 60,
                        width: width - 30,
                        backgroundColor: "#F6F9FC"
                    }}
                ></img>
            </div>
        )
    }

}

export default Camera