import { _decorator, Component, instantiate, Node, Prefab, Vec2 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('SpawnController')
export class SpawnController extends Component {
    @property({ type: [Prefab] })
    prefabsToSpawn: Prefab[] = [];

    @property(Node)
    canvas: Node = null;

    @property
    spawnInterval1: number = 2;
    @property
    spawnInterval2: number = 3;
    @property
    spawnInterval3: number = 4;

    @property(Vec2)
    spawnAreaSize: Vec2 = new Vec2(640, 480);

    start() {
        this.schedule(() => this.spawnPrefab(0), this.spawnInterval1);
        this.schedule(() => this.spawnPrefab(1), this.spawnInterval2);
        this.schedule(() => this.spawnPrefab(2), this.spawnInterval3);
    }

    spawnPrefab(prefabIndex: number) {
        if (this.node.getComponent('GameManager').gameState !== 0) {
            return;
        }
        if (!this.prefabsToSpawn[prefabIndex] || !this.canvas) {
            return;
        }

        const x =
            Math.random() * this.spawnAreaSize.x - this.spawnAreaSize.x / 2;
        const y =
            Math.random() * this.spawnAreaSize.y - this.spawnAreaSize.y / 2;

        const spawnedPrefab = instantiate(this.prefabsToSpawn[prefabIndex]);
        spawnedPrefab.setPosition(x, y);
        this.canvas.addChild(spawnedPrefab);
        this.node.getComponent('GameManager').increaseElementsCount();
    }
}
