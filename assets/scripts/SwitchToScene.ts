import { _decorator, Component, Node, director } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('SwitchToScene')
export class SwitchToScene extends Component {
    switchToAnotherScene() {
        director.loadScene('scene-v2', () => {
            console.log('scene loaded');
        });
    }
}
