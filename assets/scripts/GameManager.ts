import { _decorator, AudioSource, Component, director, Label, Node } from 'cc';
import { GameOverScreen } from './GameOverScreen';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {
    @property(Label)
    public scoreLabel: Label = null;
    public currentElementsCount = 0;
    public score = 0;
    public gameState = 0 // 0 means running game; 1 means gameOver;
    public isPaused = false

    @property(GameOverScreen)
    private gameOverScreen: GameOverScreen | null = null;

    gainScore(bubbleColor: string){
        if (bubbleColor === 'White') this.score += 10
        if (bubbleColor === 'Blue') this.score += 50
        if (bubbleColor === 'Red') this.score += 80
        this.updateScoreLabel();
    }

    increaseElementsCount() {
        this.currentElementsCount += 1
        console.log(`Elements on screen: ${this.currentElementsCount}`);
        this.updateGameState()
    }

    decreaseElementsCount() {
        this.currentElementsCount -= 1
        console.log(`Elements on screen: ${this.currentElementsCount}`);  
    }

    updateGameState() {
        if(this.currentElementsCount < 10) {
            this.gameState = 0
        }else if (this.currentElementsCount >= 10) {
            this.gameOver()
        }
        console.log(this.gameState);
    }

    startGame(){
        this.gameState = 0
        this.gameOverScreen.toggleGameOverScreen(0)
        this.score = 0
        this.updateScoreLabel()
        const audioSource = this.getComponent(AudioSource);
        audioSource.play();
        this.destroyNodesWithNames(["White", "Red", "Blue"]);
        this.currentElementsCount = 0
    }

    gameOver(){
        this.gameState = 1;
        const audioSource = this.getComponent(AudioSource);
        audioSource.stop();
        this.gameOverScreen.toggleGameOverScreen(1)
    }

    updateScoreLabel() {
        if (this.scoreLabel) {
            this.scoreLabel.string = `Score: ${this.score}`;
        }
    }
    
    destroyNodesWithNames(names: string[]) {
        const scene = director.getScene();
        const canvas = scene.getChildByName("Canvas");
    
        if (canvas) {
            const parentNode = canvas.getChildByName("Node");
    
            if (parentNode) {
                const nodesToDestroy = [];
    
                // Iterate through all child nodes of "Node"
                for (const childNode of parentNode.children) {
                    if (names.includes(childNode.name)) {
                        nodesToDestroy.push(childNode);
                    }
                }
    
                for (const node of nodesToDestroy) {
                    node.destroy();
                }
            } else {
                console.log(`Child node "Node" not found within "Canvas".`);
            }
        } else {
            console.log(`Parent node "Canvas" not found in the scene.`);
        }
    }
    
    
    
    

}


