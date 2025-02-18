on("chat:message", function(msg) {
    if (msg.type === "api" && msg.content.startsWith("!ose-create-npc")) {
        // JSON data (example provided)
        const monsters = [
            {
                "name": "Acolyte",
                "description": "1st level clerics on a quest for their deity.",
                "Armour Class": "2 [17]",
                "Hit Dice": "1 (4hp)",
                "Attacks": "1 × mace (1d6 × 10)",
                "THAC0": "19 [0]",
                "Movement": "60’ (20’)",
                "Saving Throws": "D11 W12 P14 B16 S15 (Cleric 1)",
                "Morale": "7",
                "Alignment": "Any",
                "XP": "10",
                "Number Appearing": "1d8 (0)",
                "Treasure Type": "U",
                "notes": [
                    "Leader: Groups of 4+ are led by a higher level cleric (1d10: 1–4: 2nd level, 5–7: 3rd level, 8–9: 4th level, 10: 5th level). Choose or roll the leader’s spells."
                ]
            },
            {
                "name": "Ape, White",
                "description": "Albino, herbivorous, gorilla-like apes that live in caves and emerge at night to forage.",
                "Armour Class": "6 [13]",
                "Hit Dice": "4 (18hp)",
                "Attacks": "2 × claw (1d4) or 1 × thrown rock (1d6)",
                "THAC0": "16 [+3]",
                "Movement": "120’ (40’)",
                "Saving Throws": "D12 W13 P14 B15 S16 (2)",
                "Morale": "7",
                "Alignment": "Neutral",
                "XP": "75",
                "Number Appearing": "1d6 (2d4)",
                "Treasure Type": "None",
                "notes": [
                    "Territorial: Defend their lair with threats and, if this is ignored, violence."
                ]
            },
            {
                "name": "Berserker",
                "description": "Fighters who enter a rage in battle. They never take prisoners.",
                "Armour Class": "7 [12]",
                "Hit Dice": "1+1* (5hp)",
                "Attacks": "1 × weapon (1d8 or by weapon)",
                "THAC0": "18 [+1]",
                "Movement": "120’ (40’)",
                "Saving Throws": "D12 W13 P14 B15 S16 (1)",
                "Morale": "12",
                "Alignment": "Neutral",
                "XP": "19",
                "Number Appearing": "1d6 (3d10)",
                "Treasure Type": "P (B)",
                "notes": [
                    "Battle rage:+2 to hit humans and similar humanoids (e.g.orcs,goblins). Rage sometimes makes them attack their allies.",
                    "Hoard:Only havetreasure type Bwhen encountered in the wilderness."
                ]
            },
            {
                "name": "Normal Rat",
                "description": "Swarming packs of 6” to 2’ long individuals, with brown or grey fur. Multitudinous, disease-ridden rodents that will eat anything. Avoid contact with humans, but may attack if defending their nest or if summoned and commanded by magic (e.g. seeWererat).",
                "Armour Class": "9 [10]",
                "Hit Dice": "1hp",
                "Attacks": "1 × bite per pack (1d6 + disease)",
                "THAC0": "19 [0]",
                "Movement": "60’ (20’) / 30’ (10’) swimming",
                "Saving Throws": "D14 W15 P16 B17 S18 (NH)",
                "Morale": "5",
                "Alignment": "Neutral",
                "XP": "5",
                "Number Appearing": "5d10 (2d10)",
                "Treasure Type": "L",
                "notes": [
                    "Pack:Each group of 5–10 rats attacks as a pack. Each pack makes a single attack roll against one creature.",
                    "Engulf:The creature attacked mustsave versus deathor fall prone, unable to attack until able to stand up again.",
                    "Disease:Bite has a 1-in-20 chance of infecting the target (save versus poison). The disease has a 1-in-4 chance of being deadly (die in 1d6 days). Otherwise, the victim is sick and bedridden for one month.",
                    "Afraid of fire:Will flee fire, unless forced to fight by summoner.",
                    "Attacking in water:May attack without penalty; excellent swimmers."
                ]
            },
            {
                "name": "Pixie",
                "description": "1–2’ tall humanoids with insectoid wings. Distant relatives ofelves.",
                "Armour Class": "3 [16]",
                "Hit Dice": "1* (4hp)",
                "Attacks": "1 × dagger (1d4)",
                "THAC0": "19 [0]",
                "Movement": "90’ (30’) / 180’ (60’) flying",
                "Saving Throws": "D12 W13 P13 B15 S15 (Elf 1)",
                "Morale": "7",
                "Alignment": "Neutral",
                "XP": "13",
                "Number Appearing": "2d4 (1d4 × 10)",
                "Treasure Type": "R + S",
                "notes": [
                    "Invisible:Naturally invisible, but may choose to reveal themselves. May remain invisible when attacking: cannot be attacked in the first round; in subsequent rounds, may be attacked at -2 to hit (locatable by faint shadows and air movement).",
                    "Surprise:Always surprise, if invisible.",
                    "Limited flight:Small wings only allow 3 turns of flight. Must rest 1 turn after flying."
                ]
            },
            {
                "name": "Basilisk",
                "description": "10’ long, serpentine lizards. Unintelligent, but highly magical. Dwell in caverns and twisted brambles.",
                "Armour Class": "4 [15]",
                "Hit Dice": "6+1** (28hp)",
                "Attacks": "1 × bite (1d10 + petrification), 1 × gaze (petrification)",
                "THAC0": "13 [+6]",
                "Movement": "60’ (20’)",
                "Saving Throws": "D10 W11 P12 B13 S14 (6)",
                "Morale": "9",
                "Alignment": "Neutral",
                "XP": "950",
                "Number Appearing": "1d6 (1d6)",
                "Treasure Type": "F",
                "notes": [
                    "Surprise:Characters surprised by a basilisk meet its gaze.",
                    "Petrifying touch:Anyone touched by a basilisk is turned to stone (save vs petrify).",
                    "Petrifying gaze:Anyone meeting a basilisk’s gaze is turned to stone (save versus petrify). Unless averting eyes or using a mirror, characters in melee are affected each round.",
                    "Averting eyes:-4 penalty to-hit; the basilisk gains a +2 bonus to attack.",
                    "Mirrors:The reflection of a basilisk is harmless. Fighting by looking in a mirror incurs a -1 penalty to attack. If a basilisk sees its own reflection (2-in-6 chance), it must save or be petrified."
                ]
            },
            
        ];
        
        var generateUUID = (function() {
            "use strict";
        
            var a = 0, b = [];
            return function() {
                var c = (new Date()).getTime() + 0, d = c === a;
                a = c;
                for (var e = new Array(8), f = 7; 0 <= f; f--) {
                    e[f] = "-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz".charAt(c % 64);
                    c = Math.floor(c / 64);
                }
                c = e.join("");
                if (d) {
                    for (f = 11; 0 <= f && 63 === b[f]; f--) {
                        b[f] = 0;
                    }
                    b[f]++;
                } else {
                    for (f = 0; 12 > f; f++) {
                        b[f] = Math.floor(64 * Math.random());
                    }
                }
                for (f = 0; 12 > f; f++){
                    c += "-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz".charAt(b[f]);
                }
                return c;
            };
        }()),
        
        generateRowID = function () {
            "use strict";
            return generateUUID().replace(/_/g, "Z");
        };

        
        const parseTreasureType = (treasureTypeString) => {
            // If the treasure type is "None", handle separately
            if (treasureTypeString === "None") {
                return { monsterTreasureTypeGroup: "None", monsterTreasureTypeIndividual: "" };
            }
        
            // Check if there are parentheses
            const match = treasureTypeString.match(/^([^()]+)\s*(?:\(([^)]+)\))?$/);
        
            if (match) {
                // If there's a value in parentheses, assign it to the group
                const monsterTreasureTypeIndividual = match[2] || "";
                const monsterTreasureTypeGroup = match[1].trim();
        
                return { monsterTreasureTypeGroup, monsterTreasureTypeIndividual };
            }
        
            // If there are no parentheses, the entire string goes into the group
            return { monsterTreasureTypeGroup: treasureTypeString, monsterTreasureTypeIndividual: "" };
        };
        
        
        const createNPCs = (monsters) => {
            monsters.forEach(monster => {
                let character = createObj("character", {
                    name: monster.name,
                    inplayerjournals: "",
                    controlledby: "",
                    archived: false
                });
                character.set("gmnotes", monster.description);
        
                // Function to extract AC value for monsterAc
                const parseArmourClass = (acString) => {
                    const match = acString.match(/\[(\d+)\]/); // Extract value in square brackets
                    return match ? match[1] : ""; // Store only the second number in monsterAc
                };
        
                // Function to extract Hit Dice, modifiers, and HP
                const parseHitDice = (hdString) => {
                    hdString = hdString.replace(/\*/g, ""); // Remove asterisks
                    const hpOnlyMatch = hdString.match(/^(\d+)hp$/); // Case where it's just "Xhp"
                    const hpMatch = hdString.match(/\((\d+)hp\)/); // Extract HP in parentheses
                    const hdMatch = hdString.match(/(\d+|\½)(?:d\d+)?(?:\s*\+\s*(\d+))?/); // Extract base HD and optional modifier
        
                    let monsterHitDice = " ";
                    let monsterHitDiceModifier = " ";
                    let HP = "";
        
                    if (hpOnlyMatch) {
                        HP = hpOnlyMatch[1];
                    } else {
                        if (hpMatch) {
                            HP = hpMatch[1];
                        }
                        if (hdMatch) {
                            if (hdMatch[1] !== "½") {
                                monsterHitDice = hdMatch[1]; // First number
                            }
                            if (hdMatch[2]) {
                                monsterHitDiceModifier = hdMatch[2]; // Number after "+"
                            }
                        }
                    }
        
                    return { monsterHitDice, monsterHitDiceModifier, HP };
                };
        
                // Function to extract THAC0 and BAB values
                const parseThac0 = (thac0String) => {
                    const match = thac0String.match(/^(\d+)\s*\[(\+?-?\d+)\]$/);
                    return match ? { monsterThac0: match[1], monsterBAB: match[2].replace("+", "") } : { monsterThac0: thac0String, monsterBAB: "" };
                };
        
                // Function to parse "Number Appearing"
                const parseNumberAppearing = (numString) => {
                    const match = numString.match(/^([^()]+)(?:\s*\(([^)]+)\))?$/); // Extract first and second element
        
                    let numberAppearingWandering = match ? match[1].trim() : "";
                    let numberAppearingLair = match && match[2] ? match[2].trim() : "";
        
                    // Replace 'x' and '×' with '*'
                    numberAppearingWandering = numberAppearingWandering.replace(/[x×]/g, "*");
                    numberAppearingLair = numberAppearingLair.replace(/[x×]/g, "*");
        
                    // Leave blank if "see below"
                    if (numberAppearingWandering.toLowerCase() === "see below") numberAppearingWandering = "";
                    if (numberAppearingLair.toLowerCase() === "see below") numberAppearingLair = "";
        
                    return { numberAppearingWandering, numberAppearingLair };
                };
        
                // Function to parse Saving Throws
                const parseSavingThrows = (savingThrowsString) => {
                    const match = savingThrowsString.match(/D(\d+)\s+W(\d+)\s+P(\d+)\s+B(\d+)\s+S(\d+)/);
                    if (!match) return {};
        
                    return {
                        saveD: match[1],
                        saveW: match[2],
                        saveP: match[3],
                        saveB: match[4],
                        saveS: match[5]
                    };
                };
                
                // Extract values
                const monsterAc = parseArmourClass(monster["Armour Class"]);
                const { monsterHitDice, monsterHitDiceModifier, HP } = parseHitDice(monster["Hit Dice"]);
                const { monsterThac0, monsterBAB } = parseThac0(monster["THAC0"]);
                const { numberAppearingWandering, numberAppearingLair } = parseNumberAppearing(monster["Number Appearing"]);
                const movementExploration = monster["Movement"].split("’")[0]; // Extract first number
                const savingThrows = parseSavingThrows(monster["Saving Throws"]);
                // Parsing the "Treasure Type"
                const { monsterTreasureTypeGroup, monsterTreasureTypeIndividual } = parseTreasureType(monster["Treasure Type"]);
        
        
                // Define attributes
                const attributes = {
                    monsterAc,
                    movementExploration, 
                    monsterThac0,
                    monsterBAB,
                    monsterMorale: monster["Morale"],
                    alignment: monster["Alignment"],
                    monsterXPValue: monster["XP"],
                    numberAppearingWandering,  
                    numberAppearingLair,       
                    sheetTab: "monster",
                    monsterHitDice,            
                    monsterHitDiceModifier,
                    monsterTreasureTypeGroup,    // Add group treasure type attribute
                    monsterTreasureTypeIndividual, // Add individual treasure type attribute
                    ...savingThrows // Spread saving throws attributes
                };
                
                
                // Create attributes in Roll20
                Object.entries(attributes).forEach(([key, value]) => {
                    createObj("attribute", {
                        name: key,
                        current: value,
                        characterid: character.id
                    });
                });
        
                // Add HP (set both current and max)
                if (HP) {
                    createObj("attribute", {
                        name: "HP",
                        current: HP,
                        max: HP,  // Set max HP to the same value
                        characterid: character.id
                    });
                }
        
                // Add notes
                if (monster.notes && monster.notes.length > 0) {
                    createObj("attribute", {
                        name: "notes",
                        current: monster.notes.join(" | "),
                        characterid: character.id
                    });
                }
                
                const attackString = monster["Attacks"]; 
                
                if (!attackString) return;
                
                const updates = {};
                const diceRegex = /(\d*d\d+(?:[+-]\d+)?)/; // Captures standard dice expressions

                // Function to split attack patterns while ignoring "or" inside parentheses
                function splitAttacks(input) {
                    let results = [];
                    let current = "";
                    let depth = 0; // Track parentheses depth
                
                    for (let i = 0; i < input.length; i++) {
                        const char = input[i];
                
                        if (char === "(") depth++;
                        if (char === ")") depth--;
                
                        // Only split at " or " or ", " if outside parentheses
                        if ((input.slice(i, i + 4) === " or " || input.slice(i, i + 2) === ", ") && depth === 0) {
                            results.push(current.trim());
                            current = "";
                            i += (input.slice(i, i + 4) === " or ") ? 3 : 1; // Skip delimiter length
                        } else {
                            current += char;
                        }
                    }
                
                    if (current) results.push(current.trim()); // Add the last chunk
                    return results;
                }
                
                const attackPatterns = splitAttacks(attackString);
                
                attackPatterns.forEach(attackEntry => {
                    const match = attackEntry.match(/(\d+)\s*×\s*([\w\s-]+)\s*\(([^)]+)\)/);
                    if (match) {
                        const [, count, name, damageText] = match;
                        const diceMatch = damageText.match(diceRegex);
                        const extractedDamage = diceMatch ? diceMatch[0] : "0";
                
                        const newRowId = generateRowID();
                        const repeatingPrefix = `repeating_weapons_${newRowId}`;
                
                        updates[`${repeatingPrefix}_weaponAttacks`] = count;
                        updates[`${repeatingPrefix}_weaponName`] = name.trim();
                        updates[`${repeatingPrefix}_weaponDamageDie`] = extractedDamage;
                        updates[`${repeatingPrefix}_weaponDescription`] = attackEntry; // Now stores just the relevant portion
                    }
                });

                
                setAttrs(character.id, updates);
                sendChat("GM", `/w GM Created ${monster.name}`)
            });
        };
        
        createNPCs(monsters);
    }
});
