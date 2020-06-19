var pointLight, sun, mercury, venus, moon, earth, mars, jupiter, saturn, uranus, neptune, 
mercuryOrbit, venusOrbit, earthOrbit, marsOrbit, jupiterOrbit, saturnOrbit, uranusOrbit, neptuneOrbit,
controls, scene, camera, renderer, scene;
var planetSegments = 48;
var mercuryData = constructPlanetData(87.969, 0.00025, 4, "mercury", "img/mercury.jpg", 0.0383, planetSegments);
var venusData = constructPlanetData(224.7, 0.00006, 7, "venus", "img/venus.jpg", 0.0949, planetSegments);
var earthData = constructPlanetData(365.2564, 0.015, 10, "earth", "img/earth.jpg", 0.1, planetSegments);
var moonData = constructPlanetData(29.5, 0.01, 0.28, "moon", "img/moon.jpg", 0.05, planetSegments);
var marsData = constructPlanetData(686.971, 0.014, 15, "mars", "img/mars.jpg", 0.0533, planetSegments);
var jupiterData = constructPlanetData(4332.59, 0.036, 52, "jupiter", "img/jupiter.jpg", 1.1209, planetSegments);
var saturnData = constructPlanetData(10756.199, 0.033, 95, "saturn", "img/saturn.jpg", 0.9449, planetSegments);
var uranusData = constructPlanetData(30707.489, 0.02, 192, "uranus", "img/uranus.jpg", 0.4007, planetSegments);
var neptuneData = constructPlanetData(60223.353, 0.022, 301, "neptune", "img/neptune.jpg", 0.3883, planetSegments);
var orbitData = {value: 100, runOrbit: true, runRotation: true};
var clock = new THREE.Clock();

/**
 * This eliminates the redundance of having to type property names for a planet object.
 * @param {type} myOrbitRate decimal
 * @param {type} myRotationRate decimal
 * @param {type} myDistanceFromAxis decimal
 * @param {type} myName string
 * @param {type} myTexture image file path
 * @param {type} mySize decimal
 * @param {type} mySegments integer
 * @returns {constructPlanetData.mainAnonym$0}
 */
function constructPlanetData(myOrbitRate, myRotationRate, myDistanceFromAxis, myName, myTexture, mySize, mySegments) {
    return {
        orbitRate: myOrbitRate
        , rotationRate: myRotationRate
        , distanceFromAxis: myDistanceFromAxis
        , name: myName
        , texture: myTexture
        , size: mySize
        , segments: mySegments
    };
}

/**
 * create a visible ring and add it to the scene.
 * @param {type} size decimal
 * @param {type} innerDiameter decimal
 * @param {type} facets integer
 * @param {type} myColor HTML color
 * @param {type} name string
 * @param {type} distanceFromAxis decimal
 * @returns {THREE.Mesh|myRing}
 */
function getRing(size, innerDiameter, facets, myColor, name, distanceFromAxis) {
    var ring1Geometry = new THREE.RingGeometry(size, innerDiameter, facets);
    var ring1Material = new THREE.MeshBasicMaterial({color: myColor, side: THREE.DoubleSide});
    var myRing = new THREE.Mesh(ring1Geometry, ring1Material);
    myRing.name = name;
    myRing.position.set(distanceFromAxis, 0, 0);
    myRing.rotation.x = Math.PI / 2;
    scene.add(myRing);
    return myRing;
}

/**
 * Used to create a three dimensional ring. This takes more processing power to 
 * run that getRing(). So use this sparingly, such as for the outermost ring of
 * Saturn.
 * @param {type} size decimal
 * @param {type} innerDiameter decimal
 * @param {type} facets integer
 * @param {type} myColor HTML color
 * @param {type} name string
 * @param {type} distanceFromAxis decimal
 * @returns {THREE.Mesh|myRing}
 */
function getTube(size, innerDiameter, facets, myColor, name, distanceFromAxis) {
    var ringGeometry = new THREE.TorusGeometry(size, innerDiameter, facets, facets);
    var ringMaterial = new THREE.MeshBasicMaterial({color: myColor, side: THREE.DoubleSide});
    myRing = new THREE.Mesh(ringGeometry, ringMaterial);
    myRing.name = name;
    myRing.position.set(distanceFromAxis, 0, 0);
    myRing.rotation.x = Math.PI / 2;
    scene.add(myRing);
    return myRing;
}

/**
 * Simplifies the creation of materials used for visible objects.
 * @param {type} type
 * @param {type} color
 * @param {type} myTexture
 * @returns {THREE.MeshStandardMaterial|THREE.MeshLambertMaterial|THREE.MeshPhongMaterial|THREE.MeshBasicMaterial}
 */
function getMaterial(type, color, myTexture) {
    var materialOptions = {
        color: color === undefined ? 'rgb(255, 255, 255)' : color,
        map: myTexture === undefined ? null : myTexture
    };

    switch (type) {
        case 'basic':
            return new THREE.MeshBasicMaterial(materialOptions);
        case 'lambert':
            return new THREE.MeshLambertMaterial(materialOptions);
        case 'phong':
            return new THREE.MeshPhongMaterial(materialOptions);
        case 'standard':
            return new THREE.MeshStandardMaterial(materialOptions);
        default:
            return new THREE.MeshBasicMaterial(materialOptions);
    }
}

/**
 *  Draws all of the orbits to be shown in the scene.
 * @returns {undefined}
 */
function createVisibleOrbits() {
    var orbitWidth = 0.01;
    mercuryOrbit = getRing(mercuryData.distanceFromAxis + orbitWidth
            , mercuryData.distanceFromAxis - orbitWidth
            , 320
            , 0xffffff
            , "mercuryOrbit"
            , 0);
    venusOrbit = getRing(venusData.distanceFromAxis + orbitWidth
            , venusData.distanceFromAxis - orbitWidth
            , 320
            , 0xffffff
            , "venusOrbit"
            , 0);
    earthOrbit = getRing(earthData.distanceFromAxis + orbitWidth
            , earthData.distanceFromAxis - orbitWidth
            , 320
            , 0xffffff
            , "earthOrbit"
            , 0);
    marsOrbit = getRing(marsData.distanceFromAxis + orbitWidth
            , marsData.distanceFromAxis - orbitWidth
            , 320
            , 0xffffff
            , "marsOrbit"
            , 0);
    jupiterOrbit = getRing(jupiterData.distanceFromAxis + orbitWidth
            , jupiterData.distanceFromAxis - orbitWidth
            , 320
            , 0xffffff
            , "jupiterOrbit"
            , 0);
    saturnOrbit = getRing(saturnData.distanceFromAxis + orbitWidth
            , saturnData.distanceFromAxis - orbitWidth
            , 320
            , 0xffffff
            , "saturnOrbit"
            , 0);
    uranusOrbit = getRing(uranusData.distanceFromAxis + orbitWidth
            , uranusData.distanceFromAxis - orbitWidth
            , 320
            , 0xffffff
            , "uranusOrbit"
            , 0);
    neptuneOrbit = getRing(neptuneData.distanceFromAxis + orbitWidth
		    , neptuneData.distanceFromAxis - orbitWidth
		    , 320
		    , 0xffffff
		    , "neptuneOrbit"
		    , 0);
}

/**
 * Simplifies the creation of a sphere.
 * @param {type} material THREE.SOME_TYPE_OF_CONSTRUCTED_MATERIAL
 * @param {type} size decimal
 * @param {type} segments integer
 * @returns {getSphere.obj|THREE.Mesh}
 */
function getSphere(material, size, segments) {
    var geometry = new THREE.SphereGeometry(size, segments, segments);
    var obj = new THREE.Mesh(geometry, material);
    obj.castShadow = true;

    return obj;
}

/**
 * Creates a planet and adds it to the scene.
 * @param {type} myData data for a planet object
 * @param {type} x integer
 * @param {type} y integer
 * @param {type} z integer
 * @param {type} myMaterialType string that is passed to getMaterial()
 * @returns {getSphere.obj|THREE.Mesh|loadTexturedPlanet.myPlanet}
 */
function loadTexturedPlanet(myData, x, y, z, myMaterialType) {
    var myMaterial;
    var passThisTexture;

    if (myData.texture && myData.texture !== "") {
        passThisTexture = new THREE.ImageUtils.loadTexture(myData.texture);
    }
    if (myMaterialType) {
        myMaterial = getMaterial(myMaterialType, "rgb(255, 255, 255 )", passThisTexture);
    } else {
        myMaterial = getMaterial("lambert", "rgb(255, 255, 255 )", passThisTexture);
    }

    myMaterial.receiveShadow = true;
    myMaterial.castShadow = true;
    var myPlanet = getSphere(myMaterial, myData.size, myData.segments);
    myPlanet.receiveShadow = true;
    myPlanet.name = myData.name;
    scene.add(myPlanet);
    myPlanet.position.set(x, y, z);

    return myPlanet;
}

/**
 * Simplifies creating a light that disperses in all directions.
 * @param {type} intensity decimal
 * @param {type} color HTML color
 * @returns {THREE.PointLight|getPointLight.light}
 */
function getPointLight(intensity, color) {
    var light = new THREE.PointLight(color, intensity);
    light.castShadow = true;

    light.shadow.bias = 0.001;
    light.shadow.mapSize.width = 2048;
    light.shadow.mapSize.height = 2048;
    return light;
}

/**
 * Move the planet around its orbit, and rotate it.
 * @param {type} myPlanet
 * @param {type} myData
 * @param {type} myTime
 * @param {type} stopRotation optional set to true for rings
 * @returns {undefined}
 */
function movePlanet(myPlanet, myData, myTime, stopRotation) {
    if (orbitData.runRotation && !stopRotation) {
        myPlanet.rotation.y += myData.rotationRate;
    }
    if (orbitData.runOrbit) {
        myPlanet.position.x = Math.cos(myTime 
                * (1.0 / (myData.orbitRate * orbitData.value)) + 10.0) 
                * myData.distanceFromAxis;
        myPlanet.position.z = Math.sin(myTime 
                * (1.0 / (myData.orbitRate * orbitData.value)) + 10.0) 
                * myData.distanceFromAxis;
    }
}

/**
 * Move the moon around its orbit with the planet, and rotate it.
 * @param {type} myMoon
 * @param {type} myPlanet
 * @param {type} myData
 * @param {type} myTime
 * @returns {undefined}
 */
function moveSatellite(mySatellite, myPlanet, myData, myTime) {
    movePlanet(mySatellite, myData, myTime);
    if (orbitData.runOrbit) {
    	mySatellite.position.x = mySatellite.position.x + myPlanet.position.x;
    	mySatellite.position.z = mySatellite.position.z + myPlanet.position.z;
    }
}

/**
 * This function is called in a loop to create animation.
 * @param {type} renderer
 * @param {type} scene
 * @param {type} camera
 * @param {type} controls
 * @returns {undefined}
 */
function update(renderer, scene, camera, controls) {
    pointLight.position.copy(sun.position);
    controls.update();

    var time = Date.now();

    movePlanet(mercury, mercuryData, time);
    movePlanet(venus, venusData, time);
    movePlanet(earth, earthData, time);
    moveSatellite(moon, earth, moonData, time);
    movePlanet(mars, marsData, time);
    movePlanet(jupiter, jupiterData, time);
    movePlanet(saturn, saturnData, time);
    movePlanet(uranus, uranusData, time);
    movePlanet(neptune, neptuneData, time);

    renderer.render(scene, camera);
    requestAnimationFrame(function () {
        update(renderer, scene, camera, controls);
    });
}

/**
 * This is the function that starts everything.
 * @returns {THREE.Scene|scene}
 */
function init() {
    // Create the camera that allows us to view into the scene.
    camera = new THREE.PerspectiveCamera(
            34, // field of view
            window.innerWidth / window.innerHeight, // aspect ratio
            1, // near clipping plane
            1000 // far clipping plane
            );
    camera.position.z = 300;
    camera.position.x = -300;
    camera.position.y = 300;
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    // Create the scene that holds all of the visible objects.
    scene = new THREE.Scene();

    // Create the renderer that controls animation.
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Attach the renderer to the div element.
    document.getElementById('webgl').appendChild(renderer.domElement);

    // Create controls that allows a user to move the scene with a mouse.
    controls = new THREE.OrbitControls(camera, renderer.domElement);

    // Load the images used in the background.
    var path = 'cubemap/';
    var format = '.jpg';
    var urls = [
        path + 'px' + format, path + 'nx' + format,
        path + 'py' + format, path + 'ny' + format,
        path + 'pz' + format, path + 'nz' + format
    ];
    var reflectionCube = new THREE.CubeTextureLoader().load(urls);
    reflectionCube.format = THREE.RGBFormat;

    // Attach the background cube to the scene.
    scene.background = reflectionCube;

    // Create light from the sun.
    pointLight = getPointLight(0.3, "rgb(255, 220, 180)");
    scene.add(pointLight);

    // Create light that is viewable from all directions.
    var ambientLight = new THREE.AmbientLight(0x777777);
    scene.add(ambientLight);

    // Create the sun.
    var sunMaterial = new THREE.MeshBasicMaterial({color: 'rgb(255, 255, 255)'});
    sun = getSphere(sunMaterial, 1.03, 48);
    scene.add(sun);

    // Create the glow of the sun.
    var spriteMaterial = new THREE.SpriteMaterial(
            {
                map: new THREE.ImageUtils.loadTexture("img/glow.png")
                , useScreenCoordinates: false
                , color: 0xffffee
                , transparent: false
                , blending: THREE.AdditiveBlending
            });
    var sprite = new THREE.Sprite(spriteMaterial);
    sprite.scale.set(7, 7, 1.0);
    sun.add(sprite); // This centers the glow at the sun.

    // Create planets.
    mercury = loadTexturedPlanet(mercuryData, mercuryData.distanceFromAxis, 0, 0);
    venus = loadTexturedPlanet(venusData, venusData.distanceFromAxis, 0, 0);
    earth = loadTexturedPlanet(earthData, earthData.distanceFromAxis, 0, 0);
    moon = loadTexturedPlanet(moonData, moonData.distanceFromAxis, 0, 0);
    mars = loadTexturedPlanet(marsData, marsData.distanceFromAxis, 0, 0);
    jupiter = loadTexturedPlanet(jupiterData, jupiterData.distanceFromAxis, 0, 0);
    saturn = loadTexturedPlanet(saturnData, saturnData.distanceFromAxis, 0, 0);
    uranus = loadTexturedPlanet(uranusData, uranusData.distanceFromAxis, 0, 0);
    neptune = loadTexturedPlanet(neptuneData, neptuneData.distanceFromAxis, 0, 0);

    // Create the visible orbit that the Earth uses.
    createVisibleOrbits();

    // Create the GUI that displays controls.
    var gui = new dat.GUI();
    var folder = gui.addFolder('speed');
    folder.add(orbitData, 'value', 0, 500);
    folder.add(orbitData, 'runOrbit', 0, 1);
    folder.add(orbitData, 'runRotation', 0, 1);

    // Start the animation.
    update(renderer, scene, camera, controls);
}

// Start everything.
init();
