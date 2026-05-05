export const muscleGroups = [
  {
    id: 'chest',
    name: 'Pecs',
    exercises: [
      // ===== Barre =====
      { id: 'bench-press-barbell-flat',         name: 'Développé couché barre',                 equipment: 'Barre',           type: 'compound',  pattern: 'horizontal-press' },
      { id: 'bench-press-barbell-incline',      name: 'Développé incliné barre',                equipment: 'Barre',           type: 'compound',  pattern: 'incline-press' },
      { id: 'bench-press-barbell-decline',      name: 'Développé décliné barre',                equipment: 'Barre',           type: 'compound',  pattern: 'decline-press' },
      { id: 'bench-press-barbell-close-grip',   name: 'Développé couché barre prise serrée',    equipment: 'Barre',           type: 'compound',  pattern: 'horizontal-press' },
      { id: 'bench-press-barbell-wide-grip',    name: 'Développé couché barre prise large',     equipment: 'Barre',           type: 'compound',  pattern: 'horizontal-press' },
      { id: 'floor-press-barbell',              name: 'Floor press barre',                      equipment: 'Barre',           type: 'compound',  pattern: 'horizontal-press' },
      { id: 'guillotine-press-barbell',         name: 'Développé guillotine barre',             equipment: 'Barre',           type: 'compound',  pattern: 'horizontal-press' },

      // ===== Haltères =====
      { id: 'bench-press-dumbbell-flat',        name: 'Développé couché haltères',              equipment: 'Haltères',        type: 'compound',  pattern: 'horizontal-press' },
      { id: 'bench-press-dumbbell-incline',     name: 'Développé incliné haltères',             equipment: 'Haltères',        type: 'compound',  pattern: 'incline-press' },
      { id: 'bench-press-dumbbell-decline',     name: 'Développé décliné haltères',             equipment: 'Haltères',        type: 'compound',  pattern: 'decline-press' },
      { id: 'fly-dumbbell-flat',                name: 'Écartés haltères plat',                  equipment: 'Haltères',        type: 'isolation', pattern: 'horizontal-fly' },
      { id: 'fly-dumbbell-incline',             name: 'Écartés haltères incliné',               equipment: 'Haltères',        type: 'isolation', pattern: 'incline-fly' },
      { id: 'fly-dumbbell-decline',             name: 'Écartés haltères décliné',               equipment: 'Haltères',        type: 'isolation', pattern: 'decline-fly' },
      { id: 'pullover-dumbbell',                name: 'Pull-over haltère',                      equipment: 'Haltères',        type: 'isolation', pattern: 'pullover' },
      { id: 'svend-press-dumbbell',             name: 'Svend press haltères',                   equipment: 'Haltères',        type: 'isolation', pattern: 'horizontal-press' },
      { id: 'squeeze-press-dumbbell',           name: 'Squeeze press haltères',                 equipment: 'Haltères',        type: 'compound',  pattern: 'horizontal-press' },

      // ===== Machines =====
      { id: 'chest-press-machine-flat',         name: 'Chest press machine',                    equipment: 'Machine',         type: 'compound',  pattern: 'horizontal-press' },
      { id: 'chest-press-machine-incline',      name: 'Chest press incliné machine',            equipment: 'Machine',         type: 'compound',  pattern: 'incline-press' },
      { id: 'chest-press-machine-decline',      name: 'Chest press décliné machine',            equipment: 'Machine',         type: 'compound',  pattern: 'decline-press' },
      { id: 'pec-deck-machine',                 name: 'Pec deck (butterfly)',                   equipment: 'Machine',         type: 'isolation', pattern: 'horizontal-fly' },
      { id: 'seated-fly-machine',               name: 'Écarté assis machine',                   equipment: 'Machine',         type: 'isolation', pattern: 'horizontal-fly' },
      { id: 'smith-bench-press-flat',           name: 'Développé couché Smith machine',         equipment: 'Machine',         type: 'compound',  pattern: 'horizontal-press' },
      { id: 'smith-bench-press-incline',        name: 'Développé incliné Smith machine',        equipment: 'Machine',         type: 'compound',  pattern: 'incline-press' },
      { id: 'hammer-strength-chest-press',      name: 'Hammer Strength chest press',            equipment: 'Machine',         type: 'compound',  pattern: 'horizontal-press' },

      // ===== Poulies =====
      { id: 'cable-fly-high',                   name: 'Écartés poulie haute',                   equipment: 'Poulies',         type: 'isolation', pattern: 'cable-fly-down' },
      { id: 'cable-fly-mid',                    name: 'Écartés poulie moyenne',                 equipment: 'Poulies',         type: 'isolation', pattern: 'cable-fly-mid' },
      { id: 'cable-fly-low',                    name: 'Écartés poulie basse',                   equipment: 'Poulies',         type: 'isolation', pattern: 'cable-fly-up' },
      { id: 'cable-crossover-high-to-low',      name: 'Cross over haut vers bas',               equipment: 'Poulies',         type: 'isolation', pattern: 'cable-fly-down' },
      { id: 'cable-crossover-low-to-high',      name: 'Cross over bas vers haut',               equipment: 'Poulies',         type: 'isolation', pattern: 'cable-fly-up' },
      { id: 'cable-bench-press-flat',           name: 'Développé couché à la poulie',           equipment: 'Poulies',         type: 'compound',  pattern: 'horizontal-press' },
      { id: 'cable-bench-press-incline',        name: 'Développé incliné à la poulie',          equipment: 'Poulies',         type: 'compound',  pattern: 'incline-press' },

      // ===== Poids de corps =====
      { id: 'push-up-standard',                 name: 'Pompes classiques',                      equipment: 'Poids de corps',  type: 'compound',  pattern: 'horizontal-press' },
      { id: 'push-up-wide',                     name: 'Pompes prise large',                     equipment: 'Poids de corps',  type: 'compound',  pattern: 'horizontal-press' },
      { id: 'push-up-narrow',                   name: 'Pompes prise serrée (diamant)',          equipment: 'Poids de corps',  type: 'compound',  pattern: 'horizontal-press' },
      { id: 'push-up-decline',                  name: 'Pompes déclinées (pieds surélevés)',     equipment: 'Poids de corps',  type: 'compound',  pattern: 'decline-press' },
      { id: 'push-up-incline',                  name: 'Pompes inclinées (mains surélevées)',    equipment: 'Poids de corps',  type: 'compound',  pattern: 'incline-press' },
      { id: 'push-up-archer',                   name: 'Pompes archer',                          equipment: 'Poids de corps',  type: 'compound',  pattern: 'horizontal-press' },
      { id: 'push-up-deficit',                  name: 'Pompes en déficit',                      equipment: 'Poids de corps',  type: 'compound',  pattern: 'horizontal-press' },
      { id: 'dips-chest-leaning',               name: 'Dips buste penché (pecs)',               equipment: 'Poids de corps',  type: 'compound',  pattern: 'decline-press' }
    ]
  },

  {
    id: 'back',
    name: 'Dos',
    exercises: [
      { id: 'deadlift-conventional',            name: 'Soulevé de terre',                       equipment: 'Barre',           type: 'compound',  pattern: 'hinge' },
      { id: 'deadlift-sumo',                    name: 'Soulevé de terre sumo',                  equipment: 'Barre',           type: 'compound',  pattern: 'hinge' },
      { id: 'deadlift-deficit',                 name: 'Soulevé de terre en déficit',            equipment: 'Barre',           type: 'compound',  pattern: 'hinge' },
      { id: 'rack-pull',                        name: 'Rack pull',                              equipment: 'Barre',           type: 'compound',  pattern: 'hinge' },
      { id: 'bent-over-row-barbell',            name: 'Rowing barre buste penché',              equipment: 'Barre',           type: 'compound',  pattern: 'horizontal-pull' },
      { id: 'pendlay-row-barbell',              name: 'Pendlay row',                            equipment: 'Barre',           type: 'compound',  pattern: 'horizontal-pull' },
      { id: 't-bar-row',                        name: 'T-bar row',                              equipment: 'Barre',           type: 'compound',  pattern: 'horizontal-pull' },
      { id: 'meadows-row',                      name: 'Meadows row',                            equipment: 'Barre',           type: 'compound',  pattern: 'horizontal-pull' },
      { id: 'shrug-barbell',                    name: 'Shrug barre (trapèzes)',                 equipment: 'Barre',           type: 'isolation', pattern: 'shrug' },

      { id: 'one-arm-row-dumbbell',             name: 'Rowing haltère unilatéral',              equipment: 'Haltères',        type: 'compound',  pattern: 'horizontal-pull' },
      { id: 'chest-supported-row-dumbbell',     name: 'Rowing haltères poitrine appuyée',       equipment: 'Haltères',        type: 'compound',  pattern: 'horizontal-pull' },
      { id: 'kroc-row-dumbbell',                name: 'Kroc row',                               equipment: 'Haltères',        type: 'compound',  pattern: 'horizontal-pull' },
      { id: 'pullover-dumbbell-back',           name: 'Pull-over haltère (dos)',                equipment: 'Haltères',        type: 'isolation', pattern: 'pullover' },
      { id: 'shrug-dumbbell',                   name: 'Shrug haltères',                         equipment: 'Haltères',        type: 'isolation', pattern: 'shrug' },

      { id: 'lat-pulldown-wide',                name: 'Tirage vertical poulie prise large',     equipment: 'Poulies',         type: 'compound',  pattern: 'vertical-pull' },
      { id: 'lat-pulldown-neutral',             name: 'Tirage vertical prise neutre',           equipment: 'Poulies',         type: 'compound',  pattern: 'vertical-pull' },
      { id: 'lat-pulldown-supinated',           name: 'Tirage vertical prise supination',       equipment: 'Poulies',         type: 'compound',  pattern: 'vertical-pull' },
      { id: 'seated-cable-row',                 name: 'Tirage horizontal assis poulie',         equipment: 'Poulies',         type: 'compound',  pattern: 'horizontal-pull' },
      { id: 'straight-arm-pulldown',            name: 'Pull-over à la poulie haute',            equipment: 'Poulies',         type: 'isolation', pattern: 'pullover' },
      { id: 'face-pull-rope',                   name: 'Face pull à la corde',                   equipment: 'Poulies',         type: 'isolation', pattern: 'rear-delt-pull' },

      { id: 'machine-row-low',                  name: 'Rowing machine assis',                   equipment: 'Machine',         type: 'compound',  pattern: 'horizontal-pull' },
      { id: 'machine-row-high',                 name: 'Tirage poitrine machine',                equipment: 'Machine',         type: 'compound',  pattern: 'horizontal-pull' },
      { id: 'hammer-strength-pulldown',         name: 'Hammer Strength pulldown',               equipment: 'Machine',         type: 'compound',  pattern: 'vertical-pull' },
      { id: 'assisted-pull-up-machine',         name: 'Tractions assistées machine',            equipment: 'Machine',         type: 'compound',  pattern: 'vertical-pull' },

      { id: 'pull-up',                          name: 'Tractions pronation',                    equipment: 'Poids de corps',  type: 'compound',  pattern: 'vertical-pull' },
      { id: 'chin-up',                          name: 'Tractions supination',                   equipment: 'Poids de corps',  type: 'compound',  pattern: 'vertical-pull' },
      { id: 'neutral-grip-pull-up',             name: 'Tractions prise neutre',                 equipment: 'Poids de corps',  type: 'compound',  pattern: 'vertical-pull' },
      { id: 'inverted-row',                     name: 'Rowing australien',                      equipment: 'Poids de corps',  type: 'compound',  pattern: 'horizontal-pull' }
    ]
  },

  {
    id: 'legs',
    name: 'Jambes',
    exercises: [
      { id: 'back-squat-barbell',               name: 'Squat barre',                            equipment: 'Barre',           type: 'compound',  pattern: 'squat' },
      { id: 'front-squat-barbell',              name: 'Front squat',                            equipment: 'Barre',           type: 'compound',  pattern: 'squat' },
      { id: 'low-bar-squat-barbell',            name: 'Low bar squat',                          equipment: 'Barre',           type: 'compound',  pattern: 'squat' },
      { id: 'pause-squat-barbell',              name: 'Pause squat',                            equipment: 'Barre',           type: 'compound',  pattern: 'squat' },
      { id: 'romanian-deadlift-barbell',        name: 'Soulevé de terre roumain',               equipment: 'Barre',           type: 'compound',  pattern: 'hinge' },
      { id: 'stiff-leg-deadlift-barbell',       name: 'Soulevé de terre jambes tendues',        equipment: 'Barre',           type: 'compound',  pattern: 'hinge' },
      { id: 'good-morning-barbell',             name: 'Good morning',                           equipment: 'Barre',           type: 'compound',  pattern: 'hinge' },
      { id: 'lunge-barbell',                    name: 'Fentes barre',                           equipment: 'Barre',           type: 'compound',  pattern: 'lunge' },
      { id: 'split-squat-barbell',              name: 'Split squat barre',                      equipment: 'Barre',           type: 'compound',  pattern: 'lunge' },

      { id: 'goblet-squat-dumbbell',            name: 'Goblet squat haltère',                   equipment: 'Haltères',        type: 'compound',  pattern: 'squat' },
      { id: 'lunge-dumbbell',                   name: 'Fentes haltères',                        equipment: 'Haltères',        type: 'compound',  pattern: 'lunge' },
      { id: 'walking-lunge-dumbbell',           name: 'Fentes marchées haltères',               equipment: 'Haltères',        type: 'compound',  pattern: 'lunge' },
      { id: 'bulgarian-split-squat-dumbbell',   name: 'Squat bulgare haltères',                 equipment: 'Haltères',        type: 'compound',  pattern: 'lunge' },
      { id: 'step-up-dumbbell',                 name: 'Step-up haltères',                       equipment: 'Haltères',        type: 'compound',  pattern: 'lunge' },
      { id: 'romanian-deadlift-dumbbell',       name: 'Soulevé de terre roumain haltères',      equipment: 'Haltères',        type: 'compound',  pattern: 'hinge' },

      { id: 'leg-press-machine',                name: 'Presse à cuisses',                       equipment: 'Machine',         type: 'compound',  pattern: 'squat' },
      { id: 'hack-squat-machine',               name: 'Hack squat machine',                     equipment: 'Machine',         type: 'compound',  pattern: 'squat' },
      { id: 'pendulum-squat-machine',           name: 'Pendulum squat',                         equipment: 'Machine',         type: 'compound',  pattern: 'squat' },
      { id: 'leg-extension-machine',            name: 'Leg extension',                          equipment: 'Machine',         type: 'isolation', pattern: 'knee-extension' },
      { id: 'leg-curl-lying-machine',           name: 'Leg curl allongé',                       equipment: 'Machine',         type: 'isolation', pattern: 'knee-flexion' },
      { id: 'leg-curl-seated-machine',          name: 'Leg curl assis',                         equipment: 'Machine',         type: 'isolation', pattern: 'knee-flexion' },
      { id: 'nordic-hamstring-curl',            name: 'Nordic hamstring curl',                  equipment: 'Machine',         type: 'isolation', pattern: 'knee-flexion' },
      { id: 'hip-adduction-machine',            name: 'Adducteurs machine',                     equipment: 'Machine',         type: 'isolation', pattern: 'hip-adduction' },
      { id: 'hip-abduction-machine',            name: 'Abducteurs machine',                     equipment: 'Machine',         type: 'isolation', pattern: 'hip-abduction' },
      { id: 'smith-squat',                      name: 'Squat Smith machine',                    equipment: 'Machine',         type: 'compound',  pattern: 'squat' },

      { id: 'cable-pull-through',               name: 'Pull-through poulie',                    equipment: 'Poulies',         type: 'compound',  pattern: 'hinge' },
      { id: 'cable-kickback-leg',               name: 'Kickback jambe poulie',                  equipment: 'Poulies',         type: 'isolation', pattern: 'hip-extension' },

      { id: 'pistol-squat',                     name: 'Pistol squat',                           equipment: 'Poids de corps',  type: 'compound',  pattern: 'squat' },
      { id: 'sissy-squat',                      name: 'Sissy squat',                            equipment: 'Poids de corps',  type: 'isolation', pattern: 'knee-extension' },
      { id: 'bodyweight-squat',                 name: 'Squat poids de corps',                   equipment: 'Poids de corps',  type: 'compound',  pattern: 'squat' }
    ]
  },

  {
    id: 'shoulders',
    name: 'Épaules',
    exercises: [
      { id: 'overhead-press-barbell',           name: 'Développé militaire barre',              equipment: 'Barre',           type: 'compound',  pattern: 'vertical-press' },
      { id: 'push-press-barbell',               name: 'Push press barre',                       equipment: 'Barre',           type: 'compound',  pattern: 'vertical-press' },
      { id: 'behind-the-neck-press-barbell',    name: 'Développé nuque barre',                  equipment: 'Barre',           type: 'compound',  pattern: 'vertical-press' },
      { id: 'upright-row-barbell',              name: 'Rowing menton barre',                    equipment: 'Barre',           type: 'compound',  pattern: 'upright-pull' },

      { id: 'overhead-press-dumbbell',          name: 'Développé haltères assis',               equipment: 'Haltères',        type: 'compound',  pattern: 'vertical-press' },
      { id: 'arnold-press-dumbbell',            name: 'Arnold press',                           equipment: 'Haltères',        type: 'compound',  pattern: 'vertical-press' },
      { id: 'lateral-raise-dumbbell',           name: 'Élévations latérales haltères',          equipment: 'Haltères',        type: 'isolation', pattern: 'lateral-raise' },
      { id: 'front-raise-dumbbell',             name: 'Élévations frontales haltères',          equipment: 'Haltères',        type: 'isolation', pattern: 'front-raise' },
      { id: 'rear-delt-fly-dumbbell',           name: 'Oiseau haltères (deltoïde postérieur)',  equipment: 'Haltères',        type: 'isolation', pattern: 'rear-delt-fly' },
      { id: 'y-raise-dumbbell',                 name: 'Y-raise haltères',                       equipment: 'Haltères',        type: 'isolation', pattern: 'lateral-raise' },

      { id: 'shoulder-press-machine',           name: 'Développé épaules machine',              equipment: 'Machine',         type: 'compound',  pattern: 'vertical-press' },
      { id: 'lateral-raise-machine',            name: 'Élévations latérales machine',           equipment: 'Machine',         type: 'isolation', pattern: 'lateral-raise' },
      { id: 'rear-delt-machine',                name: 'Pec deck inversé (rear delt)',           equipment: 'Machine',         type: 'isolation', pattern: 'rear-delt-fly' },
      { id: 'smith-overhead-press',             name: 'Développé militaire Smith',              equipment: 'Machine',         type: 'compound',  pattern: 'vertical-press' },

      { id: 'cable-lateral-raise',              name: 'Élévations latérales poulie',            equipment: 'Poulies',         type: 'isolation', pattern: 'lateral-raise' },
      { id: 'cable-front-raise',                name: 'Élévations frontales poulie',            equipment: 'Poulies',         type: 'isolation', pattern: 'front-raise' },
      { id: 'cable-rear-delt-fly',              name: 'Oiseau à la poulie',                     equipment: 'Poulies',         type: 'isolation', pattern: 'rear-delt-fly' },
      { id: 'face-pull-shoulders',              name: 'Face pull (épaules)',                    equipment: 'Poulies',         type: 'isolation', pattern: 'rear-delt-pull' },
      { id: 'cable-upright-row',                name: 'Rowing menton poulie',                   equipment: 'Poulies',         type: 'compound',  pattern: 'upright-pull' },

      { id: 'pike-push-up',                     name: 'Pike push-up',                           equipment: 'Poids de corps',  type: 'compound',  pattern: 'vertical-press' },
      { id: 'handstand-push-up',                name: 'Pompes en équilibre sur les mains',      equipment: 'Poids de corps',  type: 'compound',  pattern: 'vertical-press' }
    ]
  },

  {
    id: 'biceps',
    name: 'Biceps',
    exercises: [
      { id: 'curl-barbell-straight',            name: 'Curl barre droite',                      equipment: 'Barre',           type: 'isolation', pattern: 'elbow-flexion' },
      { id: 'curl-barbell-ez',                  name: 'Curl barre EZ',                          equipment: 'Barre',           type: 'isolation', pattern: 'elbow-flexion' },
      { id: 'reverse-curl-barbell',             name: 'Curl inversé barre (pronation)',         equipment: 'Barre',           type: 'isolation', pattern: 'elbow-flexion' },
      { id: 'drag-curl-barbell',                name: 'Drag curl barre',                        equipment: 'Barre',           type: 'isolation', pattern: 'elbow-flexion' },

      { id: 'curl-dumbbell-alternating',        name: 'Curl haltères alterné',                  equipment: 'Haltères',        type: 'isolation', pattern: 'elbow-flexion' },
      { id: 'curl-dumbbell-incline',            name: 'Curl incliné haltères',                  equipment: 'Haltères',        type: 'isolation', pattern: 'elbow-flexion' },
      { id: 'hammer-curl-dumbbell',             name: 'Curl marteau haltères',                  equipment: 'Haltères',        type: 'isolation', pattern: 'elbow-flexion' },
      { id: 'concentration-curl-dumbbell',      name: 'Curl concentration',                     equipment: 'Haltères',        type: 'isolation', pattern: 'elbow-flexion' },
      { id: 'spider-curl-dumbbell',             name: 'Spider curl haltères',                   equipment: 'Haltères',        type: 'isolation', pattern: 'elbow-flexion' },
      { id: 'preacher-curl-dumbbell',           name: 'Curl pupitre haltère',                   equipment: 'Haltères',        type: 'isolation', pattern: 'elbow-flexion' },

      { id: 'preacher-curl-machine',            name: 'Curl pupitre machine',                   equipment: 'Machine',         type: 'isolation', pattern: 'elbow-flexion' },
      { id: 'biceps-curl-machine',              name: 'Curl biceps machine',                    equipment: 'Machine',         type: 'isolation', pattern: 'elbow-flexion' },

      { id: 'cable-curl-straight-bar',          name: 'Curl barre poulie basse',                equipment: 'Poulies',         type: 'isolation', pattern: 'elbow-flexion' },
      { id: 'cable-curl-rope',                  name: 'Curl à la corde poulie',                 equipment: 'Poulies',         type: 'isolation', pattern: 'elbow-flexion' },
      { id: 'cable-hammer-curl-rope',           name: 'Curl marteau corde poulie',              equipment: 'Poulies',         type: 'isolation', pattern: 'elbow-flexion' },
      { id: 'bayesian-curl-cable',              name: 'Bayesian curl (poulie en arrière)',      equipment: 'Poulies',         type: 'isolation', pattern: 'elbow-flexion' },

      { id: 'chin-up-biceps',                   name: 'Tractions supination (biceps)',          equipment: 'Poids de corps',  type: 'compound',  pattern: 'vertical-pull' }
    ]
  },

  {
    id: 'triceps',
    name: 'Triceps',
    exercises: [
      { id: 'close-grip-bench-press',           name: 'Développé couché prise serrée',          equipment: 'Barre',           type: 'compound',  pattern: 'horizontal-press' },
      { id: 'skull-crusher-barbell',            name: 'Barre au front',                         equipment: 'Barre',           type: 'isolation', pattern: 'elbow-extension' },
      { id: 'jm-press-barbell',                 name: 'JM press',                               equipment: 'Barre',           type: 'compound',  pattern: 'elbow-extension' },

      { id: 'overhead-extension-dumbbell',      name: 'Extension nuque haltère',                equipment: 'Haltères',        type: 'isolation', pattern: 'elbow-extension' },
      { id: 'kickback-dumbbell',                name: 'Kickback haltère',                       equipment: 'Haltères',        type: 'isolation', pattern: 'elbow-extension' },
      { id: 'skull-crusher-dumbbell',           name: 'Barre au front haltères',                equipment: 'Haltères',        type: 'isolation', pattern: 'elbow-extension' },
      { id: 'tate-press-dumbbell',              name: 'Tate press haltères',                    equipment: 'Haltères',        type: 'isolation', pattern: 'elbow-extension' },

      { id: 'triceps-pushdown-rope',            name: 'Pushdown corde poulie',                  equipment: 'Poulies',         type: 'isolation', pattern: 'elbow-extension' },
      { id: 'triceps-pushdown-bar',             name: 'Pushdown barre poulie',                  equipment: 'Poulies',         type: 'isolation', pattern: 'elbow-extension' },
      { id: 'triceps-pushdown-v-bar',           name: 'Pushdown V-bar poulie',                  equipment: 'Poulies',         type: 'isolation', pattern: 'elbow-extension' },
      { id: 'overhead-extension-cable-rope',    name: 'Extension nuque corde poulie',           equipment: 'Poulies',         type: 'isolation', pattern: 'elbow-extension' },
      { id: 'reverse-grip-pushdown',            name: 'Pushdown supination poulie',             equipment: 'Poulies',         type: 'isolation', pattern: 'elbow-extension' },
      { id: 'cable-skull-crusher',              name: 'Barre au front à la poulie',             equipment: 'Poulies',         type: 'isolation', pattern: 'elbow-extension' },

      { id: 'triceps-dip-machine',              name: 'Dips machine triceps',                   equipment: 'Machine',         type: 'compound',  pattern: 'elbow-extension' },
      { id: 'triceps-extension-machine',        name: 'Extension triceps machine',              equipment: 'Machine',         type: 'isolation', pattern: 'elbow-extension' },

      { id: 'dips-triceps',                     name: 'Dips buste droit (triceps)',             equipment: 'Poids de corps',  type: 'compound',  pattern: 'elbow-extension' },
      { id: 'bench-dip',                        name: 'Dips entre deux bancs',                  equipment: 'Poids de corps',  type: 'compound',  pattern: 'elbow-extension' },
      { id: 'diamond-push-up',                  name: 'Pompes diamant',                         equipment: 'Poids de corps',  type: 'compound',  pattern: 'horizontal-press' }
    ]
  },

  {
    id: 'abs',
    name: 'Abdos',
    exercises: [
      { id: 'crunch-floor',                     name: 'Crunch au sol',                          equipment: 'Poids de corps',  type: 'isolation', pattern: 'trunk-flexion' },
      { id: 'sit-up',                           name: 'Sit-up',                                 equipment: 'Poids de corps',  type: 'isolation', pattern: 'trunk-flexion' },
      { id: 'leg-raise-lying',                  name: 'Relevé de jambes au sol',                equipment: 'Poids de corps',  type: 'isolation', pattern: 'hip-flexion' },
      { id: 'hanging-leg-raise',                name: 'Relevé de jambes suspendu',              equipment: 'Poids de corps',  type: 'isolation', pattern: 'hip-flexion' },
      { id: 'hanging-knee-raise',               name: 'Relevé de genoux suspendu',              equipment: 'Poids de corps',  type: 'isolation', pattern: 'hip-flexion' },
      { id: 'plank-front',                      name: 'Gainage planche',                        equipment: 'Poids de corps',  type: 'isolation', pattern: 'anti-extension' },
      { id: 'side-plank',                       name: 'Gainage latéral',                        equipment: 'Poids de corps',  type: 'isolation', pattern: 'anti-lateral-flexion' },
      { id: 'mountain-climber',                 name: 'Mountain climber',                       equipment: 'Poids de corps',  type: 'compound',  pattern: 'hip-flexion' },
      { id: 'v-up',                             name: 'V-up',                                   equipment: 'Poids de corps',  type: 'isolation', pattern: 'trunk-flexion' },
      { id: 'dragon-flag',                      name: 'Dragon flag',                            equipment: 'Poids de corps',  type: 'isolation', pattern: 'anti-extension' },

      { id: 'cable-crunch-rope',                name: 'Crunch poulie haute (corde)',            equipment: 'Poulies',         type: 'isolation', pattern: 'trunk-flexion' },
      { id: 'cable-woodchopper',                name: 'Woodchopper poulie',                     equipment: 'Poulies',         type: 'compound',  pattern: 'rotation' },
      { id: 'pallof-press-cable',               name: 'Pallof press poulie',                    equipment: 'Poulies',         type: 'isolation', pattern: 'anti-rotation' },

      { id: 'crunch-machine',                   name: 'Crunch machine',                         equipment: 'Machine',         type: 'isolation', pattern: 'trunk-flexion' },
      { id: 'rotary-torso-machine',             name: 'Rotary torso machine',                   equipment: 'Machine',         type: 'isolation', pattern: 'rotation' },
      { id: 'roman-chair-leg-raise',            name: 'Relevé de jambes chaise romaine',        equipment: 'Machine',         type: 'isolation', pattern: 'hip-flexion' },

      { id: 'weighted-sit-up-dumbbell',         name: 'Sit-up lesté haltère',                   equipment: 'Haltères',        type: 'isolation', pattern: 'trunk-flexion' },
      { id: 'russian-twist-dumbbell',           name: 'Russian twist haltère',                  equipment: 'Haltères',        type: 'isolation', pattern: 'rotation' },
      { id: 'side-bend-dumbbell',               name: 'Inclinaison latérale haltère',           equipment: 'Haltères',        type: 'isolation', pattern: 'lateral-flexion' },

      { id: 'ab-wheel-rollout',                 name: 'Roue abdominale',                        equipment: 'Poids de corps',  type: 'compound',  pattern: 'anti-extension' }
    ]
  },

  {
    id: 'glutes',
    name: 'Fessiers',
    exercises: [
      { id: 'hip-thrust-barbell',               name: 'Hip thrust barre',                       equipment: 'Barre',           type: 'compound',  pattern: 'hip-extension' },
      { id: 'glute-bridge-barbell',             name: 'Pont fessier barre',                     equipment: 'Barre',           type: 'compound',  pattern: 'hip-extension' },
      { id: 'sumo-deadlift-glutes',             name: 'Soulevé de terre sumo (fessiers)',       equipment: 'Barre',           type: 'compound',  pattern: 'hinge' },

      { id: 'hip-thrust-dumbbell',              name: 'Hip thrust haltère',                     equipment: 'Haltères',        type: 'compound',  pattern: 'hip-extension' },
      { id: 'glute-bridge-dumbbell',            name: 'Pont fessier haltère',                   equipment: 'Haltères',        type: 'compound',  pattern: 'hip-extension' },
      { id: 'curtsy-lunge-dumbbell',            name: 'Fente curtsy haltères',                  equipment: 'Haltères',        type: 'compound',  pattern: 'lunge' },
      { id: 'b-stance-rdl-dumbbell',            name: 'B-stance RDL haltères',                  equipment: 'Haltères',        type: 'compound',  pattern: 'hinge' },

      { id: 'hip-thrust-machine',               name: 'Hip thrust machine',                     equipment: 'Machine',         type: 'compound',  pattern: 'hip-extension' },
      { id: 'glute-kickback-machine',           name: 'Kickback machine',                       equipment: 'Machine',         type: 'isolation', pattern: 'hip-extension' },
      { id: 'reverse-hyper-machine',            name: 'Reverse hyper',                          equipment: 'Machine',         type: 'compound',  pattern: 'hip-extension' },
      { id: 'hip-abduction-machine-glutes',     name: 'Abducteurs machine (fessiers)',          equipment: 'Machine',         type: 'isolation', pattern: 'hip-abduction' },

      { id: 'cable-kickback-glutes',            name: 'Kickback poulie',                        equipment: 'Poulies',         type: 'isolation', pattern: 'hip-extension' },
      { id: 'cable-hip-abduction',              name: 'Abduction poulie debout',                equipment: 'Poulies',         type: 'isolation', pattern: 'hip-abduction' },
      { id: 'cable-pull-through-glutes',        name: 'Pull-through poulie (fessiers)',         equipment: 'Poulies',         type: 'compound',  pattern: 'hinge' },

      { id: 'glute-bridge-bodyweight',          name: 'Pont fessier poids de corps',            equipment: 'Poids de corps',  type: 'isolation', pattern: 'hip-extension' },
      { id: 'single-leg-glute-bridge',          name: 'Pont fessier unilatéral',                equipment: 'Poids de corps',  type: 'isolation', pattern: 'hip-extension' },
      { id: 'frog-pump',                        name: 'Frog pump',                              equipment: 'Poids de corps',  type: 'isolation', pattern: 'hip-extension' }
    ]
  },

  {
    id: 'calves',
    name: 'Mollets',
    exercises: [
      { id: 'standing-calf-raise-barbell',      name: 'Mollets debout barre',                   equipment: 'Barre',           type: 'isolation', pattern: 'ankle-extension' },
      { id: 'standing-calf-raise-dumbbell',     name: 'Mollets debout haltères',                equipment: 'Haltères',        type: 'isolation', pattern: 'ankle-extension' },
      { id: 'seated-calf-raise-dumbbell',       name: 'Mollets assis haltères',                 equipment: 'Haltères',        type: 'isolation', pattern: 'ankle-extension' },

      { id: 'standing-calf-raise-machine',      name: 'Mollets debout machine',                 equipment: 'Machine',         type: 'isolation', pattern: 'ankle-extension' },
      { id: 'seated-calf-raise-machine',        name: 'Mollets assis machine',                  equipment: 'Machine',         type: 'isolation', pattern: 'ankle-extension' },
      { id: 'leg-press-calf-raise',             name: 'Mollets à la presse',                    equipment: 'Machine',         type: 'isolation', pattern: 'ankle-extension' },
      { id: 'smith-calf-raise',                 name: 'Mollets Smith machine',                  equipment: 'Machine',         type: 'isolation', pattern: 'ankle-extension' },
      { id: 'donkey-calf-raise-machine',        name: 'Donkey calf raise machine',              equipment: 'Machine',         type: 'isolation', pattern: 'ankle-extension' },
      { id: 'tibialis-raise-machine',           name: 'Tibialis raise machine',                 equipment: 'Machine',         type: 'isolation', pattern: 'ankle-flexion' },

      { id: 'standing-calf-raise-bodyweight',   name: 'Mollets debout poids de corps',          equipment: 'Poids de corps',  type: 'isolation', pattern: 'ankle-extension' },
      { id: 'single-leg-calf-raise',            name: 'Mollets unilatéral poids de corps',      equipment: 'Poids de corps',  type: 'isolation', pattern: 'ankle-extension' }
    ]
  }
];

// ============================ Helpers ============================

// Quick lookup of an exercise object by its id.
export const EXERCISES_BY_ID = muscleGroups
  .flatMap(group => group.exercises)
  .reduce((acc, ex) => { acc[ex.id] = ex; return acc; }, {});

// Quick lookup of the muscle group an exercise belongs to, by exercise id.
export const GROUP_BY_EXERCISE_ID = muscleGroups
  .flatMap(group => group.exercises.map(ex => [ex.id, group]))
  .reduce((acc, [id, group]) => { acc[id] = group; return acc; }, {});
