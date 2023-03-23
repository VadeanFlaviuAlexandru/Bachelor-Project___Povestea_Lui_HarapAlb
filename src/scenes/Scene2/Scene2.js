import { Anims } from '../../plugins/anims';

export class Scene2 extends Phaser.Scene {
    constructor() {
        super('Scene2');
        this.cursors = null;
        this.player = null;
        this.animsManager = new Anims(this)
    }
    preload() {
        // map
        this.load.image("tilesOutsideCastle", 'src/assets/World/SimpleGrassTiles.png');
        this.load.image("tiles1OutsideCastle", 'src/assets/World/BridgeTiles.png');
        this.load.image("tiles2OutsideCastle", 'src/assets/World/PlantTiles.png');
        this.load.image("tiles3OutsideCastle", 'src/assets/World/FenceTiles.png');
        this.load.image("tiles5OutsideCastle", 'src/assets/World/StoneTiles.png');
        this.load.image("tiles6OutsideCastle", 'src/assets/World/PropsTiles.png');
        this.load.image("tiles7OutsideCastle", 'src/assets/World/StructureTiles.png');
        this.load.image("tiles8OutsideCastle", 'src/assets/World/WallsTiles2.png');
        this.load.image("tiles9OutsideCastle", 'src/assets/World/WaterTiles.png');
        this.load.tilemapTiledJSON("mapOutsideCastle", 'src/assets/Scene2/Scene2.json');
        // player
        this.animsManager.preload();
        // script
        this.load.json("scriptData", "src/assets/script.json")
    }
    init(data) {
        this.spawnX = data.x;
        this.spawnY = data.y;
    }
    create() {
        // player stuff
        this.cursors = this.input.keyboard.createCursorKeys();
        window.player = this.player = this.add.character({
            x: this.spawnX,
            y: this.spawnY,
            name: 'HarapAlb',
            image: 'HarapAlb',
            speed: 340
        })
        this.player.setTexture("HarapAlb", "HarapAlb-front")
        // map stuff
        const mapOutsideCastle = this.make.tilemap({ key: "mapOutsideCastle" });
        const tilesetOutsideCastle = mapOutsideCastle.addTilesetImage("SimpleGrassTiles", "tilesOutsideCastle")
        const tileset5OutsideCastle = mapOutsideCastle.addTilesetImage("StoneTiles", "tiles5OutsideCastle")
        const tileset6OutsideCastle = mapOutsideCastle.addTilesetImage("PropsTiles", "tiles6OutsideCastle")
        const tileset2OutsideCastle = mapOutsideCastle.addTilesetImage("PlantTiles", "tiles2OutsideCastle")
        const tileset8OutsideCastle = mapOutsideCastle.addTilesetImage("WallsTiles2", "tiles8OutsideCastle")
        const tileset10OutsideCastle = mapOutsideCastle.addTilesetImage("StructureTiles", "tiles7OutsideCastle")
        const tileset9OutsideCastle = mapOutsideCastle.addTilesetImage("NearWaterTiles", "tiles9OutsideCastle")
        const tileset1OutsideCastle = mapOutsideCastle.addTilesetImage("BridgeTiles", "tiles1OutsideCastle")
        const layer1OutsideCastle = mapOutsideCastle.createLayer("GrassLayer", tilesetOutsideCastle)
        const layer2OutsideCastle = mapOutsideCastle.createLayer("OuterWallsLayer", tileset5OutsideCastle)
        const layer12OutsideCastle = mapOutsideCastle.createLayer("OuterGrassLayer", tileset2OutsideCastle)
        const layer3OutsideCastle = mapOutsideCastle.createLayer("WallsLayer", tileset8OutsideCastle)
        const layer11OutsideCastle = mapOutsideCastle.createLayer("GateLayer", tileset10OutsideCastle)
        const layer6OutsideCastle = mapOutsideCastle.createLayer("PlantLayer", tileset2OutsideCastle)
        const layer9OutsideCastle = mapOutsideCastle.createLayer("PlantTreeLayer", tileset2OutsideCastle)
        const layer10OutsideCastle = mapOutsideCastle.createLayer("WaterLayer", tileset9OutsideCastle)
        const layer4OutsideCastle = mapOutsideCastle.createLayer("BridgeLayer", tileset1OutsideCastle)
        const layer5OutsideCastle = mapOutsideCastle.createLayer("OuterBridgeLayer", tileset1OutsideCastle)
        const layer7OutsideCastle = mapOutsideCastle.createLayer("PropsLayer", tileset6OutsideCastle)
        layer11OutsideCastle.setCollisionByProperty({ collide: true })
        this.physics.add.collider(this.player, layer11OutsideCastle, this.HitLayer.bind(this))
        layer3OutsideCastle.setCollisionByProperty({ collide: true })
        this.physics.add.collider(this.player, layer3OutsideCastle, this.HitLayer.bind(this))
        layer6OutsideCastle.setCollisionByProperty({ collide: true })
        this.physics.add.collider(this.player, layer6OutsideCastle, this.HitLayer.bind(this))
        layer9OutsideCastle.setCollisionByProperty({ collide: true })
        this.physics.add.collider(this.player, layer9OutsideCastle, this.HitLayer.bind(this))
        layer10OutsideCastle.setCollisionByProperty({ collide: true })
        this.physics.add.collider(this.player, layer10OutsideCastle, this.HitLayer.bind(this))
        layer4OutsideCastle.setCollisionByProperty({ collide: true })
        this.physics.add.collider(this.player, layer4OutsideCastle, this.HitLayer.bind(this))
        layer7OutsideCastle.setCollisionByProperty({ collide: true })
        this.physics.add.collider(this.player, layer7OutsideCastle, this.HitLayer.bind(this))
        layer5OutsideCastle.setCollisionByProperty({ collide: true })
        this.physics.add.collider(this.player, layer5OutsideCastle, this.HitLayer.bind(this))
        // camera
        const camera = this.cameras.main;
        camera.startFollow(this.player);
        camera.setBounds(0, 0, mapOutsideCastle.widthInPixels, mapOutsideCastle.heightInPixels);
        camera.setBounds(0, 0, mapOutsideCastle.widthInPixels, mapOutsideCastle.heightInPixels);
        // animations
        this.animsManager.create();
        // correcting layers
        this.player.setDepth(10);
        layer6OutsideCastle.setDepth(11)
        layer9OutsideCastle.setDepth(12);

        // script for interactions
        this.script = this.cache.json.get('scriptData')
        const objectLayer = mapOutsideCastle.getObjectLayer('ScriptLayer');
        if (objectLayer && objectLayer.objects) {
            objectLayer.objects.forEach(
                (object) => {
                    let tmp = this.add.rectangle((object.x + (object.width / 2)), (object.y + (object.height / 2)), object.width, object.height);
                    tmp.properties = object.properties.reduce(
                        (obj, item) => Object.assign(obj, { [item.name]: item.value }), {}
                    );
                    this.physics.world.enable(tmp, 1);
                    this.physics.add.collider(this.player, tmp, this.HitScript, null, this);
                }
            );
        }
    }

    update() {
        // animations
        if (this.cursors.left.isDown)
            this.player.SetInstruction({ action: 'walk', option: 'left' });
        else if (this.cursors.right.isDown)
            this.player.SetInstruction({ action: 'walk', option: 'right' });
        if (this.cursors.up.isDown)
            this.player.SetInstruction({ action: 'walk', option: 'back' });
        else if (this.cursors.down.isDown)
            this.player.SetInstruction({ action: 'walk', option: 'front' });
        this.player.update();
        // dialog
        if (this.Dialog.visible) {
            player.body.velocity.x = 0;
            player.body.velocity.y = 0;
            if (this.cursors.space.isDown) {
                this.Dialog.display(false);
            }
            return false;
        }
    }
    steer(force) {
        if (cursors.left.isDown) {
            Phaser.Physics.Matter.Matter.Body.applyForce(car.body, car.getTopRight(), force);
        }
        else if (cursors.right.isDown) {
            Phaser.Physics.Matter.Matter.Body.applyForce(car.body, car.getBottomRight(), vec.neg(force));
        }
    }
    HitLayer(player, target) {
        if (target.properties.portal && !this.Dialog.visible) {
            if (this.registry.get("ExitAttic") !== 1 && !(target.properties.portal == "Cutscene4")) {
                this.scene.start(target.properties.portal);
            } else if (this.registry.get("ExitAttic") == 1) {
                this.scene.start(target.properties.portal);
            }
        }
    }

    HitScript(player, target) {
        if (target.properties.name && !this.Dialog.visible) {
            player.anims.stopAfterRepeat(0);
            this.Dialog.setText(this.script[player.name][target.properties.name]);
        }
    }

}