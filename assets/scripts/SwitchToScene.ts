import { _decorator, Component, Node, director } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('SwitchToScene')
export class SwitchToScene extends Component {

    switchToAnotherScene() {
        // Load the target scene by its name (replace 'TargetSceneName' with the actual scene name)
        director.loadScene('scene-v2', () => {
            console.log('scene loaded');
        });
    }
}
