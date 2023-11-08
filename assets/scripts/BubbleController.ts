import {
    _decorator,
    AudioSource,
    Color,
    Component,
    EventMouse,
    find,
    Input,
    Node,
    Sprite,
} from 'cc';
import { GameManager } from './GameManager';
const { ccclass, property } = _decorator;

@ccclass('BubbleController')
export class BubbleController extends Component {
    COLOR_CLICK_REQUIREMENTS = {
        White: 1,
        Blue: 3,
        Red: 5,
    };

    @property(AudioSource)
    audioSource: AudioSource | null = null;
    @property(GameManager)
    private gameManager: GameManager | null = null;
    private numberOfClicks = 0;

    onLoad() {
        const sfxNode = find('SFX');
        const gameManagerNode = find('GameManager');
        this.audioSource = sfxNode.getComponent(AudioSource);
        this.gameManager = gameManagerNode.getComponent(GameManager);
        this.node.on(Input.EventType.MOUSE_DOWN, (event: EventMouse) => {
            if (this.canInteract()) {
                const color = event.currentTarget.name;
                const sprite = this.node.getComponent(Sprite);
                this.numberOfClicks += 1;
                this.adjustColor(sprite, -30, -30, -30);

                switch (color) {
                    case 'White':
                    case 'Blue':
                    case 'Red':
                        const requiredClicks =
                            this.COLOR_CLICK_REQUIREMENTS[color];
                        if (this.numberOfClicks === requiredClicks) {
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

    canInteract() {
        return (
            this.gameManager &&
            this.gameManager.gameState === 0 &&
            !this.gameManager.isPaused
        );
    }

    adjustColor(
        sprite: Sprite,
        rDelta: number,
        gDelta: number,
        bDelta: number
    ) {
        const originalColor = sprite.color;
        const darkerColor = new Color(
            Math.max(originalColor.r + rDelta, 0),
            Math.max(originalColor.g + gDelta, 0),
            Math.max(originalColor.b + bDelta, 0)
        );
        sprite.color = darkerColor;
    }
}
