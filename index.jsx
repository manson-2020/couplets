class Pages extends React.Component {
    constructor() {
        super();
        this.state = {
            loading: true,
            progress: 0,
            word: "",
            src: "",
            qrcode: "images/icon.png"
        }
        this.init();
    }
    init() {
        let timer = setInterval(_ => {
            this.setState({ progress: this.state.progress += 5 });
            if (this.state.progress >= 100) {
                clearInterval(timer);
                this.setState({ loading: false })
            }
        }, 100);
    }

    back = _ => {
        this.setState({ src: "", word: "" })
    }

    play = _ => {
        console.log("play");
    }

    submit = _ => {
        this.setState({ src: "" });
        fetch("http://api.shdong.cn/api/couplet/create", {
            method: "POST",
            mode: "cors",
            body: JSON.stringify({
                text: this.state.word
            })
        }).then(res => res.json())
            .then(res => res.code == 200 && this.setState({ src: res.data }))
            .catch(err => console.log(err));
        return false;
    }
    render() {
        return (
            <div className="root">
                <div onClick={() => this.setState({ qrcode: "images/qrcode.png" })} className="pc-container">
                    <img className="icon" src={this.state.qrcode} />
                    <p>点击生成二维码，玩智能春联</p>
                </div>

                {
                    this.state.src ?
                        <div className="result-img">
                            <img style={{ width: "100%", height: "100%" }} src={this.state.src} />
                            <button onClick={this.back} className="back-btn">
                                <img className="icon-back" src="/images/icon-back.png" />
                            </button>
                            <button onClick={this.play} className="play-btn">
                                <img className="icon-music" src="/images/icon-music.png" />
                            </button>
                        </div>
                        :
                        <div className="mobile-container">
                            <img className="f1 mobil-picture-main" src="images/mobil-picture-main.png" />

                            {
                                this.state.loading ?
                                    <div className="progress" data-percent={`${this.state.progress}%`}>
                                        <div className="progress-bar" data-percent={`${this.state.progress}%`}>
                                            <p style={{ width: `${this.state.progress}%` }} className="proportion"></p>
                                        </div>
                                    </div>
                                    :
                                    <div className="ai-center jc-center">
                                        <div className="logo-2020">
                                            <input onChange={e => this.setState({ word: e.target.value })} className="text-center" maxlength="4" placeholder=" 2-4字以内，仅限中文 " />
                                        </div>
                                        <div className="submit" onClick={this.submit}>
                                            <img className="icon-mobile" src="images/icon-mobile.png" />
                                        </div>
                                        <p className="fs-9">点击生成，玩智能春联</p>
                                    </div>
                            }

                            <div className="footer">
                                <img className="picture-cctv" src="images/cctv.png" />
                                <p className="describe">贵州习酒—2020庚子鼠年CCTV春节春联征集活动独家冠名企业</p>
                                <p className="describe">由百度大脑智能创作提供技术支持</p>
                            </div>
                        </div>

                }
            </div>
        )
    }
}


ReactDOM.render(<Pages />, document.getElementById("container"));