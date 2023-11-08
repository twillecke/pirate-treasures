import { _decorator, Component, Node, Label, find } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ScoreReader')
export class ScoreReader extends Component {
    @property(Label)
    label: Label = null;

    update(deltaTime: number) {
        const gameManagerNode = find('GameManager');

        if (gameManagerNode) {
            const gameManager = gameManagerNode.getComponent('GameManager');

            if (gameManager && gameManager.score !== undefined) {
                this.label.string = gameManager.score;
            } else {
                console.error(
                    'GameManager component or score property not found in GameManager.'
                );
            }
        } else {
            console.error('GameManager node not found in the hierarchy.');
        }
    }
}
