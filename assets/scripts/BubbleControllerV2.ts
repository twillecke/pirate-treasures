import { _decorator, AudioSource, Color, Component, EventMouse, find, Input, Node, Sprite } from 'cc';
import { GameManager } from './GameManager';
const { ccclass, property } = _decorator;

@ccclass('BubbleControllerV2')
export class BubbleControllerV2 extends Component {
    @property(AudioSource)
    audioSource: AudioSource | null = null;
    @property(GameManager)
    private gameManager: GameManager | null = null;
    private numberOfClicks = 0;

    onLoad() {
        const sfxNode = find("SFX");
        const gameManagerNode = find("GameManager");
        this.audioSource = sfxNode.getComponent(AudioSource);
        this.gameManager = gameManagerNode.getComponent(GameManager);

        // Check the initial gameState and disable/enable the component accordingly
        this.checkGameState();
        
        // Set up the mouse-down event
        this.node.on(Input.EventType.MOUSE_DOWN, (event: EventMouse) => {
            if (this.canInteract()) {
                const color = event.currentTarget.name;
                const sprite = this.node.getComponent(Sprite);
                this.numberOfClicks += 1;
                this.adjustColor(sprite, -30, -30, -30);

                switch (color) {
                    case 'White':
                        if (this.numberOfClicks === 1) {
                            this.audioSource.play();
                            this.gameManager.gainScore(color);
                            this.gameManager.decreaseElementsCount();
                            this.node.destroy();
                        }
                        break;
                    case 'Blue':
                        if (this.numberOfClicks === 3) {
                            this.audioSource.play();
                            this.gameManager.gainScore(color);
                            this.gameManager.decreaseElementsCount();
                            this.node.destroy();
                        }
                        break;
                    case 'Red':
                        if (this.numberOfClicks === 5) {
                            this.audioSource.play();
                            this.gameManager.gainScore(color);
                            this.gameManager.decreaseElementsCount();
                            this.node.destroy();
                        }
                        break;
                }
            }
        });
    }

    checkGameState() {
        if (this.gameManager && this.gameManager.gameState !== 0) {
            // Disable the script component when gameState is not equal to 0
            this.enabled = false;
        }
    }

    canInteract() {
        return this.gameManager && this.gameManager.gameState === 0 && !this.gameManager.isPaused;
    }

    adjustColor(sprite: Sprite, rDelta: number, gDelta: number, bDelta: number) {
        const originalColor = sprite.color;
        const darkerColor = new Color(
            Math.max(originalColor.r + rDelta, 0),
            Math.max(originalColor.g + gDelta, 0),
            Math.max(originalColor.b + bDelta, 0)
        );
        sprite.color = darkerColor;
    }
}
