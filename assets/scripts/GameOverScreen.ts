import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameOverScreen')
export class GameOverScreen extends Component {
    onLoad() {
        this.node.active = false; // Initially, hide the GameOverScreen node
    }

    // Call this method to show/hide the GameOverScreen based on gameState
    toggleGameOverScreen(gameState: number) {
        this.node.active = gameState === 1;
    }
}
