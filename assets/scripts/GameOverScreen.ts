import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameOverScreen')
export class GameOverScreen extends Component {
    onLoad() {
        this.node.active = false;
    }

    toggleGameOverScreen(gameState: number) {
        this.node.active = gameState === 1;
    }
}
