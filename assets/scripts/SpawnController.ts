import { _decorator, Component, instantiate, Node, Prefab, Vec2 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('SpawnController')
export class SpawnController extends Component {
   @property({ type: [Prefab] })
   prefabsToSpawn: Prefab[] = []; // An array to hold the three different prefabs

   @property(Node)
   canvas: Node = null;

   @property
   spawnInterval1: number = 2; // Adjust the spawn interval for prefab1
   @property
   spawnInterval2: number = 3; // Adjust the spawn interval for prefab2
   @property
   spawnInterval3: number = 4; // Adjust the spawn interval for prefab3

   @property(Vec2)
   spawnAreaSize: Vec2 = new Vec2(640, 480); // Adjust the size as needed

   start() {
       this.schedule(() => this.spawnPrefab(0), this.spawnInterval1); // Spawn the first prefab
       this.schedule(() => this.spawnPrefab(1), this.spawnInterval2); // Spawn the second prefab
       this.schedule(() => this.spawnPrefab(2), this.spawnInterval3); // Spawn the third prefab
   }

   spawnPrefab(prefabIndex: number) {
        if (this.node.getComponent("GameManager").gameState !== 0) {
            return;
    }
        if (!this.prefabsToSpawn[prefabIndex] || !this.canvas) {
            return;
    }

       const x = Math.random() * this.spawnAreaSize.x - this.spawnAreaSize.x / 2;
       const y = Math.random() * this.spawnAreaSize.y - this.spawnAreaSize.y / 2;

       const spawnedPrefab = instantiate(this.prefabsToSpawn[prefabIndex]);
       spawnedPrefab.setPosition(x, y);
       this.canvas.addChild(spawnedPrefab);
       this.node.getComponent("GameManager").increaseElementsCount();
   }
}
