import React,{Component} from 'react';
import {Button,Input} from 'react-materialize';
import '../styles/index.css';
// import {time} from '../js/funcoes';

export default class Home extends Component {
    constructor(props){
        super(props);
        this.state={
            pmminutes:0,
            pmseconds:0,
            pminter:false,
            prminutes:0,
            prseconds:0,
            printer:false,
            plminutes:0,
            plseconds:0,
            plinter:false,
            atvAtual:"",
            atvConcluidas:[],
            countAtvSeconds:0,
            countAtvMin:0,
            atvInter:false
        }

        this.timeCountPm=this.timeCountPm.bind(this);
        this.timeCountPr=this.timeCountPr.bind(this);
        this.timeCountPl=this.timeCountPl.bind(this);

        this.stopCountPm=this.stopCountPm.bind(this);
        this.stopCountPr=this.stopCountPr.bind(this);
        this.stopCountPl=this.stopCountPl.bind(this);

        this.resetCountPm=this.resetCountPm.bind(this);
        this.resetCountPr=this.resetCountPr.bind(this);
        this.resetCountPl=this.resetCountPl.bind(this);

        this.changeAtiv=this.changeAtiv.bind(this);
        this.concAtv=this.concAtv.bind(this);

        this.countAtv=this.countAtv.bind(this);
        this.stopAtv=this.stopAtv.bind(this);
        this.clearAtv=this.clearAtv.bind(this);
        this.changeAtivAtual=this.changeAtivAtual.bind(this);
    }

    componentDidMount(){
        // console.log("mount");
    }

    countAtv(){
        if(!this.state.atvInter&&this.state.atvAtual!==""){
            // this.setState(state=>({pminter:true}));
            let inter= setInterval(()=>{
                let b=this.state.countAtvSeconds+1
                if(b<60){
                    // console.log(b);
                    this.setState(state=>({countAtvSeconds:b}));
                }else{
                    b=0;
                    let min=this.state.countAtvMin+1;
                    // console.log(min);
                    if(min===25){
                        this.setState(state=>({countAtvSeconds:b,countAtvMin:min}));
                        clearInterval(this.state.atvInter);
                        this.setState(state=>({atvInter:false}));
                    }
                    else{
                        this.setState(state=>({countAtvSeconds:b,countAtvMin:min}));
                    }
                }
            },1000);

            this.setState(state=>({atvInter:inter}));
        }
    }

    stopAtv(){
        clearInterval(this.state.atvInter);
        this.setState(state=>({atvInter:false}));
    }

    clearAtv(){
        clearInterval(this.state.atvInter);
        this.setState(state=>({countAtvMin:0,countAtvSeconds:0,atvInter:false}));
    }

    resetCountPm(){
        clearInterval(this.state.pminter);
        this.setState(state=>({pmminutes:0,pmseconds:0,pminter:false}));
    }

    concAtv(){
        let res=this.state.atvConcluidas.filter(e=>e.nome);
        if(this.state.atvAtual!==""&&res.length==0){
            this.state.atvConcluidas.push({nome:this.state.atvIndic,tempo:`${this.state.countAtvMin<10?
                                                                            "0"+this.state.countAtvMin:
                                                                            this.state.countAtvMin}:
                                                                            ${this.state.countAtvSeconds<10?
                                                                            "0"+this.state.countAtvSeconds:
                                                                            this.state.countAtvSeconds}`});
            // console.log(this.state.atvConcluidas);
            this.setState(state=>({atvIndic:""}));
            this.clearAtv();
            this.stopCountPm();
            // if(this.state.pminter)
            // this.resetCountPr();
            // this.resetCountPl();
            // this.resetCountPm();
            this.forceUpdate();
        }
    }

    resetCountPr(){
        clearInterval(this.state.printer);
        this.setState(state=>({prminutes:0,prseconds:0,printer:false}));
    }

    resetCountPl(){
        clearInterval(this.state.plinter);
        this.setState(state=>({plminutes:0,plseconds:0,plinter:false}));
    }

    changeAtiv(event){
        // console.log(event.target.value);
        let b=event.target.value;
        this.setState(state=>({atvAtual:b}))
    }

    changeAtivAtual(){
        let b=this.state.atvAtual;
        if(b!==this.state.atvIndic){
            this.setState(state=>({atvIndic:b}))
            this.clearAtv();
            setTimeout(()=>{this.countAtv();this.timeCountPm();},50);
        }
    }

    stopCountPm(){
        clearInterval(this.state.pminter);
        this.setState(state=>({pminter:false}));
        this.stopAtv();
    }

    stopCountPr(){
        clearInterval(this.state.printer);
        this.setState(state=>({printer:false}));
    }

    stopCountPl(){
        clearInterval(this.state.plinter);
        this.setState(state=>({plinter:false}));
    }

    timeCountPm(){
        // console.log(this);
        if(!this.state.pminter){
            // this.setState(state=>({pminter:true}));
            let inter= setInterval(()=>{
                let b=this.state.pmseconds+1
                if(b<60){
                    // console.log(b);
                    this.setState(state=>({pmseconds:b}));
                }else{
                    b=0;
                    let min=this.state.pmminutes+1;
                    // console.log(min);
                    if(min===25){
                        this.setState(state=>({pmseconds:b,pmminutes:min}));
                        clearInterval(this.state.pminter);
                        this.setState(state=>({pminter:false}));
                    }
                    else{
                        this.setState(state=>({pmseconds:b,pmminutes:min}));
                    }
                }
            },1000);

            this.setState(state=>({pminter:inter}));
            this.countAtv();
            this.stopCountPl();
            this.resetCountPr();
        }
    }

    timeCountPr(){
        if(!this.state.printer){
            // this.setState(state=>({printer:true}));
            let inter= setInterval(()=>{
                let b=this.state.prseconds+1
                if(b<60){
                    // console.log(b);
                    this.setState(state=>({prseconds:b}));
                }else{
                    b=0;
                    let min=this.state.prminutes+1;
                    // console.log(min);
                    if(min===5){
                        this.setState(state=>({prseconds:b,prminutes:min}));
                        clearInterval(this.state.printer);
                        this.setState(state=>({printer:false}));
                    }
                    else{
                        this.setState(state=>({prseconds:b,prminutes:min}));
                    }
                }
            },1000);

            this.setState(state=>({printer:inter}));
            this.stopAtv();
            this.resetCountPm();
            this.resetCountPl();
        }
    }

    timeCountPl(){
        if(!this.state.plinter){
            // this.setState(state=>({plinter:true}));
            let inter= setInterval(()=>{
                let b=this.state.plseconds+1
                if(b<60){
                    // console.log(b);
                    this.setState(state=>({plseconds:b}));
                }else{
                    b=0;
                    let min=this.state.plminutes+1;
                    // console.log(min);
                    if(min===10){
                        this.setState(state=>({plseconds:b,plminutes:min}));
                        clearInterval(this.state.plinter);
                        this.setState(state=>({plinter:false}));
                    }
                    else{
                        this.setState(state=>({plseconds:b,plminutes:min}));
                    }
                }
            },1000);

            this.setState(state=>({plinter:inter}));
            this.stopAtv();
            this.resetCountPm();
            this.resetCountPr();
        }
    }

    render() {
        let atvs=null;
        if(this.state.atvConcluidas.length>0){
            atvs=this.state.atvConcluidas.map((e,index)=>{
                return (<h3 key={index}>{e.nome} - Tempo de conclusão: {e.tempo}</h3>)
            })
        }else{
            atvs=<h3>Nenhuma atividade concluída</h3>
        }
        return (
            <div className="textAlignCenter">
                <div className="locInp">
                    <Input className="inpCont" onChange={this.changeAtiv} value={this.state.atvAtual} placeholder="Qual sua atividade atual?" s={6}/>
                    <Button waves='light' onClick={this.changeAtivAtual}>Mudar atividade</Button>
                </div>
                <h3 className="title">Atividade atual: {this.state.countAtvMin<10
                                        ?"0"+this.state.countAtvMin
                                        :this.state.countAtvMin}
                                    :{this.state.countAtvSeconds<10
                                        ?"0"+this.state.countAtvSeconds
                                        :this.state.countAtvSeconds}</h3>
                <h1 className="title">{this.state.atvIndic?this.state.atvIndic:"Nenhuma atividade descrita"}</h1>
                <Button waves='light' onClick={this.concAtv}>Concluir Atividade</Button>
                <div className="homeContainer">
                    <div className="itemContainer">
                        <h1 className="title">Seu pomodoro</h1>
                        <h1 className="time">{this.state.pmminutes<10
                                                ?"0"+this.state.pmminutes
                                                :this.state.pmminutes}
                                            :{this.state.pmseconds<10
                                                ?"0"+this.state.pmseconds
                                                :this.state.pmseconds}</h1>
                        <div className="locBtns">
                            <Button waves='light' onClick={this.timeCountPm}>Start</Button>
                            <Button waves='light' onClick={this.resetCountPm}>reset</Button>
                            <Button waves='light' onClick={this.stopCountPm}>Stop</Button>
                        </div>
                    </div>
                    <div className="secondItens">
                      <div className="itemContainer">
                          <h1 className="title">Sua parada rápida</h1>
                          <h1 className="time">{this.state.prminutes<10
                                                  ?"0"+this.state.prminutes
                                                  :this.state.prminutes}
                                              :{this.state.prseconds<10
                                                  ?"0"+this.state.prseconds
                                                  :this.state.prseconds}</h1>
                          <div className="locBtns">
                              <Button waves='light' onClick={this.timeCountPr}>Start</Button>
                              <Button waves='light' onClick={this.resetCountPr}>reset</Button>
                              <Button waves='light' onClick={this.stopCountPr}>Stop</Button>
                          </div>
                      </div>
                      <div className="itemContainer">
                          <h1 className="title">Sua parada longa</h1>
                          <h1 className="time">{this.state.plminutes<10
                                                  ?"0"+this.state.plminutes
                                                  :this.state.plminutes}
                                              :{this.state.plseconds<10
                                                  ?"0"+this.state.plseconds
                                                  :this.state.plseconds}</h1>
                          <div className="locBtns">
                              <Button waves='light' onClick={this.timeCountPl}>Start</Button>
                              <Button waves='light' onClick={this.resetCountPl}>reset</Button>
                              <Button waves='light' onClick={this.stopCountPl}>Stop</Button>
                          </div>
                      </div>
                    </div>
                </div>
                <h1>Atividades concluídas</h1>
                {atvs}
            </div>
        );
    }
}
