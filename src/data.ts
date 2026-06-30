import { Scenario, Achievement } from './types';

export const SCENARIOS: Scenario[] = [
  // --- GENERAL ELECTRICAL SAFETY SCENARIOS (75 Scenarios) ---
  {
    id: 'g1',
    text: "Daisy-chaining two power strips together to reach a far desk.",
    isSafe: false,
    explanation: "Hazard: Connecting power strips together in a chain can overload the wall circuit and start a fire.",
    category: "Office",
    difficulty: "easy",
    mode: "general"
  },
  {
    id: 'g2',
    text: "Pulling an electrical cord from a distance to unplug a vacuum cleaner.",
    isSafe: false,
    explanation: "Hazard: Pulling the cord instead of the plastic plug damages the wire inside and can cause shocks or fires.",
    category: "Home",
    difficulty: "easy",
    mode: "general"
  },
  {
    id: 'g3',
    text: "Plugging a heavy-draw space heater directly into a wall outlet.",
    isSafe: true,
    explanation: "Safe: High-power appliances like heaters should always be plugged directly into wall outlets, never into extension cords.",
    category: "Home",
    difficulty: "medium",
    mode: "general"
  },
  {
    id: 'g4',
    text: "Running a long extension cord under a carpet or rug to keep the floor neat.",
    isSafe: false,
    explanation: "Hazard: Cords under rugs trap heat, get stepped on, and wear out quickly, creating a high risk of fire.",
    category: "Office",
    difficulty: "easy",
    mode: "general"
  },
  {
    id: 'g5',
    text: "Drying your hands completely with a towel before touching a kitchen appliance plug.",
    isSafe: true,
    explanation: "Safe: Water is an excellent conductor of electricity. Hands must always be dry before touching plugs or outlets.",
    category: "Kitchen",
    difficulty: "easy",
    mode: "general"
  },
  {
    id: 'g6',
    text: "Using a phone charger with cracked, split, or exposed copper wires.",
    isSafe: false,
    explanation: "Hazard: Damaged wires can shock you or cause short-circuits. Damaged cords should be thrown away immediately.",
    category: "Office",
    difficulty: "easy",
    mode: "general"
  },
  {
    id: 'g7',
    text: "Keeping at least a 3-foot (1 meter) clearance in front of electrical breaker boxes.",
    isSafe: true,
    explanation: "Safe: A 3-foot (1m) clearance is universally required by electrical and fire codes (like OSHA/NEC) for safe emergency access.",
    category: "Building",
    difficulty: "medium",
    mode: "general"
  },
  {
    id: 'g8',
    text: "Removing the third grounding pin from a plug to make it fit an older two-prong outlet.",
    isSafe: false,
    explanation: "Hazard: The grounding pin is a critical safety path for fault currents. Removing it drastically increases the risk of electrocution.",
    category: "Hardware",
    difficulty: "easy",
    mode: "general"
  },
  {
    id: 'g9',
    text: "Testing GFCI or RCD (Ground Fault / Residual Current) safety outlets monthly.",
    isSafe: true,
    explanation: "Safe: GFCI/RCD devices prevent fatal shocks in wet areas and must be tested regularly per global safety standards.",
    category: "Maintenance",
    difficulty: "medium",
    mode: "general"
  },
  {
    id: 'g10',
    text: "Charging a phone under your pillow or on your bed while you sleep.",
    isSafe: false,
    explanation: "Hazard: Chargers and phones release heat. Fabric traps this heat, which can easily start a bed fire.",
    category: "Home",
    difficulty: "easy",
    mode: "general"
  },
  {
    id: 'g11',
    text: "Immediately turning off the power breaker when you smell a burning odor from a wall outlet.",
    isSafe: true,
    explanation: "Safe: A burning smell means wires are melting or sparking inside. Turning off the breaker prevents a home fire.",
    category: "Home",
    difficulty: "easy",
    mode: "general"
  },
  {
    id: 'g12',
    text: "Using a standard indoor extension cord outside in the rain for festive lights.",
    isSafe: false,
    explanation: "Hazard: Indoor cords are not waterproof. Rainwater can seep in, causing short circuits, sparks, and shock hazards.",
    category: "Outdoors",
    difficulty: "medium",
    mode: "general"
  },
  {
    id: 'g13',
    text: "Plugging a microwave and a refrigerator into the same basic power strip.",
    isSafe: false,
    explanation: "Hazard: Both draw a massive amount of electrical current and will easily overload a single power strip.",
    category: "Kitchen",
    difficulty: "hard",
    mode: "general"
  },
  {
    id: 'g14',
    text: "Using a clean, dry fiberglass ladder when working near overhead power lines.",
    isSafe: true,
    explanation: "Safe: Fiberglass is non-conductive. (Note: Wood can absorb moisture and become conductive, while aluminum poses a fatal shock risk).",
    category: "Outdoors",
    difficulty: "hard",
    mode: "general"
  },
  {
    id: 'g15',
    text: "Resetting a tripped electrical breaker again and again without finding out why it tripped.",
    isSafe: false,
    explanation: "Hazard: Breakers trip to prevent fires. Overriding them repeatedly can melt the wires behind the wall.",
    category: "Maintenance",
    difficulty: "medium",
    mode: "general"
  },
  {
    id: 'g16',
    text: "Using tamper-resistant (TR) outlets that have internal shutters in a home with kids.",
    isSafe: true,
    explanation: "Safe: TR outlets prevent children from inserting objects like hairpins or keys into the slots.",
    category: "Home",
    difficulty: "medium",
    mode: "general"
  },
  {
    id: 'g17',
    text: "Keeping electric heaters, hair dryers, and radios far away from the bathtub and sink.",
    isSafe: true,
    explanation: "Safe: Keeping appliances away from water prevents accidental drops that could cause fatal water electrocution.",
    category: "Bathroom",
    difficulty: "easy",
    mode: "general"
  },
  {
    id: 'g18',
    text: "Unplugging small kitchen appliances like toasters and blenders when they are not being used.",
    isSafe: true,
    explanation: "Safe: Unplugging unused appliances saves energy and completely removes any risk of internal electrical failure fires.",
    category: "Kitchen",
    difficulty: "easy",
    mode: "general"
  },
  {
    id: 'g19',
    text: "Touching a person undergoing active electric shock with your bare hands to pull them away.",
    isSafe: false,
    explanation: "Hazard: Touching a shocked person makes you part of the electrical path. Turn off the power source first, or use a dry wooden stick.",
    category: "Emergency",
    difficulty: "hard",
    mode: "general"
  },
  {
    id: 'g20',
    text: "Plugging three multi-outlet adapters into a single wall outlet to plug in more devices.",
    isSafe: false,
    explanation: "Hazard: Overloading a single wall outlet can cause the wires behind the wall to overheat and catch fire.",
    category: "Hardware",
    difficulty: "medium",
    mode: "general"
  },
  {
    id: 'g21',
    text: "Climbing a tree that has power lines running directly through its branches.",
    isSafe: false,
    explanation: "Hazard: Tree branches touching power lines can carry high voltage, creating a dangerous shock hazard for climbers.",
    category: "Outdoors",
    difficulty: "easy",
    mode: "general"
  },
  {
    id: 'g22',
    text: "Replacing a blown fuse with one of the exact same amperage rating.",
    isSafe: true,
    explanation: "Safe: Using the same rating ensures the circuit remains protected. Never use a fuse with a higher rating than specified.",
    category: "Maintenance",
    difficulty: "medium",
    mode: "general"
  },
  {
    id: 'g23',
    text: "Using a portable generator inside your closed garage to power your appliances.",
    isSafe: false,
    explanation: "Hazard: Generators must never be used indoors due to the deadly buildup of carbon monoxide gas.",
    category: "Home",
    difficulty: "medium",
    mode: "general"
  },
  {
    id: 'g24',
    text: "Plugging electric lawnmowers and hedge trimmers into a GFCI-protected outdoor outlet.",
    isSafe: true,
    explanation: "Safe: GFCI outlets instantly cut power if a cord is cut or gets wet, protecting you from deadly shocks.",
    category: "Outdoors",
    difficulty: "medium",
    mode: "general"
  },
  {
    id: 'g25',
    text: "Pouring water on an active electrical grease fire on your stove.",
    isSafe: false,
    explanation: "Hazard: Water conducts electricity and spreads grease fires. Always use a Class C fire extinguisher or cover with a metal lid.",
    category: "Kitchen",
    difficulty: "hard",
    mode: "general"
  },
  {
    id: 'g26',
    text: "Plugging an extension cord into another extension cord to make it longer.",
    isSafe: false,
    explanation: "Hazard: Overloading multiple plug joints can cause overheating, voltage drop, and high risk of electrical fire.",
    category: "Home",
    difficulty: "easy",
    mode: "general"
  },
  {
    id: 'g27',
    text: "Tacking an extension cord to the wall baseboard using metal staples.",
    isSafe: false,
    explanation: "Hazard: Metal staples can easily pierce the protective jacket and damage the wire insulation, causing shock or fire.",
    category: "Home",
    difficulty: "easy",
    mode: "general"
  },
  {
    id: 'g28',
    text: "Using a portable space heater only when you are awake and in the room.",
    isSafe: true,
    explanation: "Safe: Space heaters must never be left running unattended or while you are sleeping.",
    category: "Home",
    difficulty: "easy",
    mode: "general"
  },
  {
    id: 'g29',
    text: "Buying electric chargers and wall adapters that have a safety certification mark like UL, CE, or ETL.",
    isSafe: true,
    explanation: "Safe: Certified safety marks ensure the product has been thoroughly tested for safety standards.",
    category: "Hardware",
    difficulty: "easy",
    mode: "general"
  },
  {
    id: 'g30',
    text: "Leaving a hair straightener plugged in on a wooden table while you go out for lunch.",
    isSafe: false,
    explanation: "Hazard: Leaving high-heat devices unattended on flammable wooden surfaces creates an extreme fire risk.",
    category: "Home",
    difficulty: "easy",
    mode: "general"
  },
  {
    id: 'g31',
    text: "Knowing where your main home power breaker box is in case of an electrical emergency.",
    isSafe: true,
    explanation: "Safe: Being able to cut power immediately can prevent electrocution or save your home during an active fire.",
    category: "Emergency",
    difficulty: "easy",
    mode: "general"
  },
  {
    id: 'g32',
    text: "Using a power strip even after it gets wet, because it looks dry now.",
    isSafe: false,
    explanation: "Hazard: Water trapped inside internal components can cause a catastrophic short circuit and shock when powered on.",
    category: "Hardware",
    difficulty: "medium",
    mode: "general"
  },
  {
    id: 'g33',
    text: "Using a damp cloth to clean a plugged-in kitchen toaster.",
    isSafe: false,
    explanation: "Hazard: Moisture on live elements can transmit lethal currents directly to your hands.",
    category: "Kitchen",
    difficulty: "easy",
    mode: "general"
  },
  {
    id: 'g34',
    text: "Wrapping an electrical cord tightly around a hot appliance immediately after using it.",
    isSafe: false,
    explanation: "Hazard: High heat melts cord insulation, and tight wrapping bends and breaks internal wires.",
    category: "Home",
    difficulty: "easy",
    mode: "general"
  },
  {
    id: 'g35',
    text: "Checking for overhead power lines before setting up a tall metal ladder outside.",
    isSafe: true,
    explanation: "Safe: This simple check prevents conductive metal ladders from making fatal contact with live power lines.",
    category: "Outdoors",
    difficulty: "easy",
    mode: "general"
  },
  {
    id: 'g36',
    text: "Overloading a single home wall outlet by plugging in four kitchen appliances at once.",
    isSafe: false,
    explanation: "Hazard: Pulling too much electrical load will overheat the outlet and wires behind the wall.",
    category: "Kitchen",
    difficulty: "easy",
    mode: "general"
  },
  {
    id: 'g37',
    text: "Throwing away an electric blanket that has folded, creased, or charred heating wires inside.",
    isSafe: true,
    explanation: "Safe: Damaged heating elements in blankets can cause severe hot spots, burns, and home fires.",
    category: "Home",
    difficulty: "medium",
    mode: "general"
  },
  {
    id: 'g38',
    text: "Plugging a standard refrigerator directly into a dedicated wall outlet of its own.",
    isSafe: true,
    explanation: "Safe: Heavy motor appliances require a dedicated outlet to prevent overloading other household circuits.",
    category: "Kitchen",
    difficulty: "medium",
    mode: "general"
  },
  {
    id: 'g39',
    text: "Using an extension cord as a permanent wiring solution for your living room television.",
    isSafe: false,
    explanation: "Hazard: Extension cords are strictly rated for temporary use only. Prolonged use degrades insulation and leads to fires.",
    category: "Home",
    difficulty: "medium",
    mode: "general"
  },
  {
    id: 'g40',
    text: "Covering an active laptop charger brick with a thick pillow to block its indicator light.",
    isSafe: false,
    explanation: "Hazard: Chargers generate heat during operation. Covering them blocks airflow, causing extreme overheating and fire risk.",
    category: "Home",
    difficulty: "easy",
    mode: "general"
  },
  {
    id: 'g41',
    text: "Installing standard plastic safety caps over unused lower wall outlets to protect toddlers.",
    isSafe: true,
    explanation: "Safe: Simple protective caps prevent curious children from sticking metal objects into live outlet slots.",
    category: "Home",
    difficulty: "easy",
    mode: "general"
  },
  {
    id: 'g42',
    text: "Standing in a puddle of water in your basement while flipping a light switch on.",
    isSafe: false,
    explanation: "Hazard: Water is highly conductive. Standing in water provides a direct path to ground for electricity, causing severe shock.",
    category: "Emergency",
    difficulty: "easy",
    mode: "general"
  },
  {
    id: 'g43',
    text: "Unplugging a computer by grabbing the thick plastic plug head and pulling it straight out.",
    isSafe: true,
    explanation: "Safe: Grabbing and pulling the plug head protects the wire terminals and the outlet from physical damage.",
    category: "Office",
    difficulty: "easy",
    mode: "general"
  },
  {
    id: 'g44',
    text: "Using a designated waterproof 'in-use' cover for outdoor electrical outlets in your wet garden.",
    isSafe: true,
    explanation: "Safe: Waterproof covers prevent moisture and rain from entering active sockets, avoiding short circuits.",
    category: "Outdoors",
    difficulty: "medium",
    mode: "general"
  },
  {
    id: 'g45',
    text: "Hanging heavy clothes or damp towels directly over a portable baseboard space heater.",
    isSafe: false,
    explanation: "Hazard: Blocking heat vents creates extreme heat buildup, and dry fabric can catch fire instantly.",
    category: "Home",
    difficulty: "easy",
    mode: "general"
  },
  {
    id: 'g46',
    text: "Replacing a light bulb only after turning off the wall switch and letting the old bulb cool down.",
    isSafe: true,
    explanation: "Safe: Prevents accidental electrical contact and avoids painful burns from hot bulb glass.",
    category: "Maintenance",
    difficulty: "easy",
    mode: "general"
  },
  {
    id: 'g47',
    text: "Running an extension cord across a high-traffic hallway where family members walk.",
    isSafe: false,
    explanation: "Hazard: Creates a serious trip hazard, and walking on the cord constantly breaks internal wires and insulation.",
    category: "Home",
    difficulty: "easy",
    mode: "general"
  },
  {
    id: 'g48',
    text: "Checking that all electrical cords are kept away from hot stovetops, radiators, and space heaters.",
    isSafe: true,
    explanation: "Safe: Keeps external heat from melting the rubber cord insulation and exposing bare live wires.",
    category: "Kitchen",
    difficulty: "easy",
    mode: "general"
  },
  {
    id: 'g49',
    text: "Plugging a multi-plug adapter into an extension cord to power five extra holiday decorations.",
    isSafe: false,
    explanation: "Hazard: Adding excessive connections on a single extension cord leads to immediate overload and electrical fire.",
    category: "Home",
    difficulty: "medium",
    mode: "general"
  },
  {
    id: 'g50',
    text: "Using an electric lawnmower on grass that is damp or wet from a recent storm.",
    isSafe: false,
    explanation: "Hazard: Water on the lawn can seep into the lawnmower's motor or cord connections, creating a lethal path of electricity.",
    category: "Outdoors",
    difficulty: "medium",
    mode: "general"
  },
  {
    id: 'g51',
    text: "Filing down the wider prong of a polarized plug so it fits into an older non-polarized outlet.",
    isSafe: false,
    explanation: "Hazard: Polarized plugs are designed to keep the hot and neutral circuits properly aligned. Filing prongs defeats this vital safety feature.",
    category: "Hardware",
    difficulty: "hard",
    mode: "general"
  },
  {
    id: 'g52',
    text: "Using an electric kettle that has a loose handle and a shaky power base.",
    isSafe: false,
    explanation: "Hazard: Loose bases can result in sparks, poor electrical contact, and sudden boiling water spills.",
    category: "Kitchen",
    difficulty: "easy",
    mode: "general"
  },
  {
    id: 'g53',
    text: "Using electrical cords that feel warm or hot to the touch while an appliance is running.",
    isSafe: false,
    explanation: "Hazard: Warm cords indicate that the wire is overloaded, damaged, or too thin for the current, representing a major fire threat.",
    category: "Hardware",
    difficulty: "medium",
    mode: "general"
  },
  {
    id: 'g54',
    text: "Allowing a certified licensed electrician to inspect and fix flickering lights in your house.",
    isSafe: true,
    explanation: "Safe: Professional electricians can properly locate and repair loose wiring faults before they cause home fires.",
    category: "Maintenance",
    difficulty: "easy",
    mode: "general"
  },
  {
    id: 'g55',
    text: "Touching electrical appliances or cords while your feet are completely bare on wet grass.",
    isSafe: false,
    explanation: "Hazard: Bare feet on wet ground make your body the perfect path for stray current to reach the earth, causing fatal shock.",
    category: "Outdoors",
    difficulty: "medium",
    mode: "general"
  },
  {
    id: 'g56',
    text: "Storing cardboard boxes and paper bags right next to your home furnace or gas water heater.",
    isSafe: false,
    explanation: "Hazard: Keeping flammable objects near high-heat or electrical ignition appliances is a severe fire risk.",
    category: "Home",
    difficulty: "easy",
    mode: "general"
  },
  {
    id: 'g57',
    text: "Unplugging your phone and laptop chargers from the wall before going on a two-week vacation.",
    isSafe: true,
    explanation: "Safe: Completely eliminates idle power draw and guards your devices against unexpected electrical power surges.",
    category: "Home",
    difficulty: "easy",
    mode: "general"
  },
  {
    id: 'g58',
    text: "Leaving a portable desk fan running in an empty closed bedroom while you are away at work.",
    isSafe: false,
    explanation: "Hazard: Unattended motorized appliances can jam, overheat, and catch fire without anyone noticing.",
    category: "Home",
    difficulty: "easy",
    mode: "general"
  },
  {
    id: 'g59',
    text: "Ensuring that bathroom outlets are placed at least 3 feet (1 meter) away from the edge of the sink.",
    isSafe: true,
    explanation: "Safe: Keeping outlets away from water splashes decreases the risk of water tracking and deadly short circuits.",
    category: "Bathroom",
    difficulty: "medium",
    mode: "general"
  },
  {
    id: 'g60',
    text: "Wrapping electric cords around hot steam pipes in the basement to keep them off the floor.",
    isSafe: false,
    explanation: "Hazard: High heat from steam pipes will quickly melt the rubber insulation on cords, creating live exposed wires.",
    category: "Building",
    difficulty: "medium",
    mode: "general"
  },
  {
    id: 'g61',
    text: "Replacing standard outlets near your kitchen sink with Ground Fault Circuit Interrupter (GFCI) outlets.",
    isSafe: true,
    explanation: "Safe: GFCIs detect minor power leaks and cut power in milliseconds, saving lives in damp environments.",
    category: "Kitchen",
    difficulty: "medium",
    mode: "general"
  },
  {
    id: 'g62',
    text: "Leaving a plug partially hanging out of an outlet with its metal prongs exposed.",
    isSafe: false,
    explanation: "Hazard: Exposed live metal prongs can easily touch falling keys, pet collars, or fingers, causing sparks and severe shocks.",
    category: "Hardware",
    difficulty: "easy",
    mode: "general"
  },
  {
    id: 'g63',
    text: "Plugging a computer, monitor, and printer into a high-quality surge protector power strip.",
    isSafe: true,
    explanation: "Safe: Surge protectors defend expensive computer parts against sudden external voltage spikes.",
    category: "Office",
    difficulty: "easy",
    mode: "general"
  },
  {
    id: 'g64',
    text: "Squeezing an extension cord tightly behind a heavy bookshelf pressed flat against the wall.",
    isSafe: false,
    explanation: "Hazard: Pinching the cord ruins insulation and breaks inner copper strands, creating local heat hotspots and fires.",
    category: "Home",
    difficulty: "easy",
    mode: "general"
  },
  {
    id: 'g65',
    text: "Checking that all electrical plugs are fully inserted and fit snugly into the wall outlet.",
    isSafe: true,
    explanation: "Safe: A tight connection prevents electrical arcing, overheating, and dangerous high-resistance faults.",
    category: "Hardware",
    difficulty: "easy",
    mode: "general"
  },
  {
    id: 'g66',
    text: "Ignoring a wall outlet that is warm to the touch or has dark discoloration around the slot holes.",
    isSafe: false,
    explanation: "Hazard: Warmth or dark marks indicate active internal sparking, faulty wires, or loose connections inside the wall.",
    category: "Home",
    difficulty: "easy",
    mode: "general"
  },
  {
    id: 'g67',
    text: "Using an electric power drill outside on the lawn while a light rain is falling.",
    isSafe: false,
    explanation: "Hazard: Rainwater entering the motor vents of power tools creates a highly dangerous shock and electrocution hazard.",
    category: "Outdoors",
    difficulty: "medium",
    mode: "general"
  },
  {
    id: 'g68',
    text: "Inspecting all extension cords for nicks, cuts, or exposed wires before plugging them in.",
    isSafe: true,
    explanation: "Safe: Catching and discarding damaged cords avoids sparks and shocks before they can occur.",
    category: "Hardware",
    difficulty: "easy",
    mode: "general"
  },
  {
    id: 'g69',
    text: "Using a metal butter knife to pry a stuck piece of bread out of a plugged-in toaster.",
    isSafe: false,
    explanation: "Hazard: Metal knife acts as a perfect electrical conductor. Touching active toaster elements will cause severe shock or death.",
    category: "Kitchen",
    difficulty: "easy",
    mode: "general"
  },
  {
    id: 'g70',
    text: "Keeping a certified Class C rated fire extinguisher in the kitchen to handle potential electrical fires.",
    isSafe: true,
    explanation: "Safe: Class C extinguishers use non-conductive chemicals designed specifically to safely extinguish live electrical fires.",
    category: "Kitchen",
    difficulty: "medium",
    mode: "general"
  },
  {
    id: 'g71',
    text: "Throwing a bucket of water on a fire caused by a computer or television.",
    isSafe: false,
    explanation: "Hazard: Water is a conductor. Throwing water on live electrics can shock you instantly and spread the fire rapidly.",
    category: "Emergency",
    difficulty: "easy",
    mode: "general"
  },
  {
    id: 'g72',
    text: "Turning off the main power breaker before changing a broken light fixture on the ceiling.",
    isSafe: true,
    explanation: "Safe: Cutting power at the breaker makes the wires dead, preventing lethal shocks during replacement work.",
    category: "Maintenance",
    difficulty: "medium",
    mode: "general"
  },
  {
    id: 'g73',
    text: "Running extension cords through holes in wooden walls or ceilings.",
    isSafe: false,
    explanation: "Hazard: Sharp wooden edges can cut cords, and hidden cords cannot dissipate heat, starting structural fires.",
    category: "Building",
    difficulty: "medium",
    mode: "general"
  },
  {
    id: 'g74',
    text: "Installing a ground wire to a metal appliance chassis to protect users from internal electrical faults.",
    isSafe: true,
    explanation: "Safe: Grounding channels faulty current safely into the earth instead of passing it through the user.",
    category: "Hardware",
    difficulty: "hard",
    mode: "general"
  },
  {
    id: 'g75',
    text: "Using an old, frayed lamp cord because 'it is only a tiny bedside lamp'.",
    isSafe: false,
    explanation: "Hazard: Any frayed wire can cause a devastating fire or shock, regardless of how small the appliance is.",
    category: "Home",
    difficulty: "easy",
    mode: "general"
  },
  {
    id: 'g76',
    text: "Plugging in a microwave with a slightly loose wall receptacle.",
    isSafe: false,
    explanation: "Hazard: Loose outlets create poor electrical connections that can spark, generate heat, and cause fires.",
    category: "Home",
    difficulty: "medium",
    mode: "general"
  },
  {
    id: 'g77',
    text: "Leaving a hair dryer plugged in right next to a sink full of water when not in use.",
    isSafe: false,
    explanation: "Hazard: If the appliance accidentally falls into the water, it could cause electrocution even if it is turned off.",
    category: "Bathroom",
    difficulty: "easy",
    mode: "general"
  },
  {
    id: 'g78',
    text: "Using a modern power strip with a built-in circuit breaker to plug in multiple low-power computer accessories.",
    isSafe: true,
    explanation: "Safe: Built-in circuit breakers on high-quality surge protectors prevent overcurrent on the extension device.",
    category: "Office",
    difficulty: "easy",
    mode: "general"
  },
  {
    id: 'g79',
    text: "Using a metal spoon to free a piece of toast stuck inside an active toaster.",
    isSafe: false,
    explanation: "Hazard: Metal conducts electricity. Touching live heating elements with metal implements will shock you.",
    category: "Kitchen",
    difficulty: "easy",
    mode: "general"
  },
  {
    id: 'g80',
    text: "Using a heavy-duty extension cord outdoors that is rated specifically for indoor use.",
    isSafe: false,
    explanation: "Hazard: Indoor cords lack the insulation and weatherproofing to protect against moisture, which can cause severe shocks.",
    category: "Outdoor",
    difficulty: "medium",
    mode: "general"
  },
  {
    id: 'g81',
    text: "Labeling each circuit breaker clearly inside your home electrical service panel.",
    isSafe: true,
    explanation: "Safe: Clear labeling ensures you can quickly and accurately cut power to specific rooms in case of an emergency.",
    category: "Building",
    difficulty: "easy",
    mode: "general"
  },
  {
    id: 'g82',
    text: "Storing a can of highly flammable spray paint directly on top of an electrical panel box.",
    isSafe: false,
    explanation: "Hazard: Electrical panels can emit sparks or heat during faults. Storing combustibles nearby is a severe fire hazard.",
    category: "Home",
    difficulty: "easy",
    mode: "general"
  },
  {
    id: 'g83',
    text: "Letting your laptop charger block sit on top of a soft duvet or heavy blanket while charging.",
    isSafe: false,
    explanation: "Hazard: Charger blocks can heat up. Soft bedding restricts airflow and traps heat, leading to fire risks.",
    category: "Home",
    difficulty: "medium",
    mode: "general"
  },
  {
    id: 'g84',
    text: "Checking that your outdoor electrical outlet has a weatherproof cover.",
    isSafe: true,
    explanation: "Safe: Weatherproof covers prevent moisture and rain from entering the receptacle, preventing short circuits.",
    category: "Outdoor",
    difficulty: "easy",
    mode: "general"
  },
  {
    id: 'g85',
    text: "Plugging a low-draw LED lamp into an extension cord.",
    isSafe: true,
    explanation: "Safe: Low-current devices like LED lamps are perfectly safe to run on certified, undamaged extension cords.",
    category: "Home",
    difficulty: "easy",
    mode: "general"
  },
  {
    id: 'g86',
    text: "Using an electrical cord that has had electrical tape wrapped around a crushed area of wire.",
    isSafe: false,
    explanation: "Hazard: Electrical tape is for minor insulation scuffs, not for repairing damaged, crushed, or severed conductors.",
    category: "Home",
    difficulty: "medium",
    mode: "general"
  },
  {
    id: 'g87',
    text: "Touching an electrical switch or wall plug with wet, sweaty hands right after exercising.",
    isSafe: false,
    explanation: "Hazard: Sweaty skin has much lower electrical resistance than dry skin, drastically increasing shock risk.",
    category: "Home",
    difficulty: "easy",
    mode: "general"
  },
  {
    id: 'g88',
    text: "Unplugging a phone charger from the wall outlet when you are going on a two-week vacation.",
    isSafe: true,
    explanation: "Safe: Unplugging unused electronics saves energy and eliminates fire risks from voltage surges while you are away.",
    category: "Home",
    difficulty: "easy",
    mode: "general"
  },
  {
    id: 'g89',
    text: "Overloading a single wall outlet by using three multi-plug adapters at once.",
    isSafe: false,
    explanation: "Hazard: Multiplying outlets excessively can overload the branch circuit wiring behind the wall, starting a hidden wall fire.",
    category: "Home",
    difficulty: "medium",
    mode: "general"
  },
  {
    id: 'g90',
    text: "Keeping electrical cords clear of high-traffic areas where they can be tripped on.",
    isSafe: true,
    explanation: "Safe: Keeping cords out of walkways prevents physical damage to the cords and avoids tripping accidents.",
    category: "Office",
    difficulty: "easy",
    mode: "general"
  },
  {
    id: 'g91',
    text: "Installing child-safety plastic caps in unused electrical outlets.",
    isSafe: true,
    explanation: "Safe: Safety caps prevent toddlers from inserting conductive metal objects like keys or forks into live receptacles.",
    category: "Home",
    difficulty: "easy",
    mode: "general"
  },
  {
    id: 'g92',
    text: "Ignoring a circuit breaker that trips repeatedly and flipping it back on every time.",
    isSafe: false,
    explanation: "Hazard: A breaker that trips repeatedly indicates an active overload or short circuit. Continuously resetting it can cause a fire.",
    category: "Maintenance",
    difficulty: "hard",
    mode: "general"
  },
  {
    id: 'g93',
    text: "Using a non-contact voltage tester to verify power is off before replacing a home light switch.",
    isSafe: true,
    explanation: "Safe: Always verify power is completely cut at the box before touching bare wires.",
    category: "Maintenance",
    difficulty: "medium",
    mode: "general"
  },
  {
    id: 'g94',
    text: "Hanging an extension cord over a sharp metal nail to organize it while in use.",
    isSafe: false,
    explanation: "Hazard: Sharp metal can cut through the rubber insulation and contact live wires, energizing the nail and wall.",
    category: "Workshop",
    difficulty: "medium",
    mode: "general"
  },
  {
    id: 'g95',
    text: "Placing a glass of water directly on top of a desktop computer tower.",
    isSafe: false,
    explanation: "Hazard: Spilling liquid into running electronics can cause a short circuit, catastrophic component failure, and shock hazard.",
    category: "Office",
    difficulty: "easy",
    mode: "general"
  },
  {
    id: 'g96',
    text: "Checking if an extension cord is warm to the touch while powering a high-draw appliance.",
    isSafe: true,
    explanation: "Safe: Warmth indicates the cord is carrying more current than it's rated for, alerting you to unplug it.",
    category: "Home",
    difficulty: "easy",
    mode: "general"
  },
  {
    id: 'g97',
    text: "Hanging holiday string lights outside using metal staples driven directly through the cord insulation.",
    isSafe: false,
    explanation: "Hazard: Metal staples can pierce the protective insulation, contacting live wires and causing short circuits or shocks.",
    category: "Outdoor",
    difficulty: "hard",
    mode: "general"
  },
  {
    id: 'g98',
    text: "Replacing a blown fuse in an older panel with a coin or copper wire because you ran out of fuses.",
    isSafe: false,
    explanation: "Hazard: Bypassing a fuse removes all overcurrent protection, causing wires to overheat and start a major structure fire.",
    category: "Maintenance",
    difficulty: "hard",
    mode: "general"
  },
  {
    id: 'g99',
    text: "Standing in a puddle of water while using an electric lawn trimmer in your yard.",
    isSafe: false,
    explanation: "Hazard: Water conducts electricity. Operating corded yard equipment in wet environments is extremely dangerous.",
    category: "Outdoor",
    difficulty: "easy",
    mode: "general"
  },
  {
    id: 'g100',
    text: "Ensuring your bathroom outlets are equipped with working GFCI protection.",
    isSafe: true,
    explanation: "Safe: GFCIs cut power in milliseconds if current leaks, preventing fatal electrocutions near sinks and tubs.",
    category: "Bathroom",
    difficulty: "easy",
    mode: "general"
  },
  {
    id: 'g101',
    text: "Discarding an electric kettle that has a loose base and sparks when placed on its stand.",
    isSafe: true,
    explanation: "Safe: Sparking indicates loose connections or failing components. Damaged appliances should be retired or repaired.",
    category: "Kitchen",
    difficulty: "easy",
    mode: "general"
  },
  {
    id: 'g102',
    text: "Wrapping a kitchen appliance cord tightly around the toaster's hot metal body to store it.",
    isSafe: false,
    explanation: "Hazard: Heat from the appliance can melt the cord's insulation, exposing bare copper wires.",
    category: "Kitchen",
    difficulty: "easy",
    mode: "general"
  },
  {
    id: 'g103',
    text: "Using a light bulb with a higher wattage rating than what is recommended on the fixture's label.",
    isSafe: false,
    explanation: "Hazard: Exceeding wattage limits can overheat the light fixture's socket and surrounding wires, causing a fire.",
    category: "Home",
    difficulty: "medium",
    mode: "general"
  },
  {
    id: 'g104',
    text: "Running extension cords through windows or doorways to power garden tools.",
    isSafe: false,
    explanation: "Hazard: Closing doors or windows can pinch, crush, or cut the cords, exposing live conductors.",
    category: "Outdoor",
    difficulty: "easy",
    mode: "general"
  },
  {
    id: 'g105',
    text: "Having a certified, licensed electrician inspect your old home's electrical wiring.",
    isSafe: true,
    explanation: "Safe: Professional inspections catch outdated wiring, overloaded circuits, and fire hazards before they cause damage.",
    category: "Building",
    difficulty: "medium",
    mode: "general"
  },
  {
    id: 'g106',
    text: "Unplugging appliances by grasping the plug firmly and pulling straight out of the wall.",
    isSafe: true,
    explanation: "Safe: Gripping the molded plug protects the wires inside from tension and physical damage.",
    category: "Home",
    difficulty: "easy",
    mode: "general"
  },
  {
    id: 'g107',
    text: "Using an electric space heater as a temporary rack to dry wet clothing or towels.",
    isSafe: false,
    explanation: "Hazard: Covering a space heater traps extreme heat and blocks airflow, posing an immediate, high-risk fire hazard.",
    category: "Home",
    difficulty: "medium",
    mode: "general"
  },
  {
    id: 'g108',
    text: "Allowing children to play with old, inactive electrical cords as toys.",
    isSafe: false,
    explanation: "Hazard: Encouraging play with cords desensitizes children to the dangers of real electrical items and exposes them to lead.",
    category: "Home",
    difficulty: "easy",
    mode: "general"
  },
  {
    id: 'g109',
    text: "Installing three-prong outlets without connecting the ground wire to a real grounding path.",
    isSafe: false,
    explanation: "Hazard: False grounding tricks users into thinking an outlet is safe when it actually offers no grounding protection.",
    category: "Building",
    difficulty: "hard",
    mode: "general"
  },
  {
    id: 'g110',
    text: "Keeping a portable radio on the edge of the bathtub while taking a bath.",
    isSafe: false,
    explanation: "Hazard: High moisture and close proximity create a risk of the radio falling into the water, causing lethal electrocution.",
    category: "Bathroom",
    difficulty: "easy",
    mode: "general"
  },
  {
    id: 'g111',
    text: "Using a designated cord organizer to store extension cords in loose, neat loops.",
    isSafe: true,
    explanation: "Safe: Proper storage prevents internal wire kinks, twists, and insulation fatigue.",
    category: "Home",
    difficulty: "easy",
    mode: "general"
  },
  {
    id: 'g112',
    text: "Cleaning your electric range's stovetop burners with a damp cloth while they are still switched on.",
    isSafe: false,
    explanation: "Hazard: Water combined with active heating elements can cause electrical faults and severe shocks.",
    category: "Kitchen",
    difficulty: "medium",
    mode: "general"
  },
  {
    id: 'g113',
    text: "Always turning off a power tool before inserting the plug into a wall outlet.",
    isSafe: true,
    explanation: "Safe: This prevents the tool from starting up unexpectedly as soon as it receives power, preventing physical injury.",
    category: "Workshop",
    difficulty: "easy",
    mode: "general"
  },
  {
    id: 'g114',
    text: "Leaving a portable battery bank charging unattended on your carpet for several days.",
    isSafe: false,
    explanation: "Hazard: Li-ion batteries can overheat during extended charging, and carpet is highly flammable if a thermal runaway occurs.",
    category: "Home",
    difficulty: "medium",
    mode: "general"
  },
  {
    id: 'g115',
    text: "Installing a smoke detector near your home electrical panel room.",
    isSafe: true,
    explanation: "Safe: Early smoke detection helps alert you to electrical fires starting in panels or wiring.",
    category: "Building",
    difficulty: "easy",
    mode: "general"
  },
  {
    id: 'g116',
    text: "Shoveling snow or clearing leaves around an outdoor ground-mounted green transformer box.",
    isSafe: true,
    explanation: "Safe: Keeping utility boxes clear ensures proper cooling ventilation and safe access for maintenance crews.",
    category: "Outdoor",
    difficulty: "medium",
    mode: "general"
  },
  {
    id: 'g117',
    text: "Squeezing a thick extension cord behind a heavy bookcase pushed flat against the wall.",
    isSafe: false,
    explanation: "Hazard: Pinching cords can damage the insulation and break internal wire strands, causing overheating and sparking.",
    category: "Office",
    difficulty: "medium",
    mode: "general"
  },
  {
    id: 'g118',
    text: "Touching a downed utility power line in the street with a dry wooden stick to see if it is dead.",
    isSafe: false,
    explanation: "Hazard: Wood can conduct high-voltage electricity, especially if damp or dirty. Never approach or touch downed lines.",
    category: "Outdoor",
    difficulty: "hard",
    mode: "general"
  },
  {
    id: 'g119',
    text: "Calling the utility company immediately if you notice tree branches resting on overhead power lines.",
    isSafe: true,
    explanation: "Safe: Tree branches can conduct power or cause power line failures. Professionals must trim these safely.",
    category: "Outdoor",
    difficulty: "medium",
    mode: "general"
  },
  {
    id: 'g120',
    text: "Vacuuming dust out of your computer's power supply fan while it is plugged in and running.",
    isSafe: false,
    explanation: "Hazard: Introducing static electricity or contacting internal components of an active power supply can cause shocks or short-circuits.",
    category: "Office",
    difficulty: "hard",
    mode: "general"
  },
  {
    id: 'g121',
    text: "Using a plastic wall conduit to hide and protect wires running along a baseboard.",
    isSafe: true,
    explanation: "Safe: Conduits protect cables from physical damage, pets chewing on them, or vacuum cleaners hitting them.",
    category: "Home",
    difficulty: "easy",
    mode: "general"
  },
  {
    id: 'g122',
    text: "Inserting a plug into an outlet that feels warm to the touch.",
    isSafe: false,
    explanation: "Hazard: Warm outlets indicate bad wiring, loose contacts, or overloading behind the wall. Do not use them.",
    category: "Home",
    difficulty: "medium",
    mode: "general"
  },
  {
    id: 'g123',
    text: "Keeping your home's central electrical panel door closed at all times.",
    isSafe: true,
    explanation: "Safe: A closed door protects the breakers from dust and moisture, and helps contain sparks if a breaker fails.",
    category: "Building",
    difficulty: "easy",
    mode: "general"
  },
  {
    id: 'g124',
    text: "Replacing a standard bedroom outlet with an outlet that has built-in USB charging ports.",
    isSafe: true,
    explanation: "Safe: Certified USB outlets are designed to safely convert AC power to DC for small devices.",
    category: "Home",
    difficulty: "easy",
    mode: "general"
  },
  {
    id: 'g125',
    text: "Letting a power cord dangle off the edge of a kitchen counter where a pet or child could pull it down.",
    isSafe: false,
    explanation: "Hazard: Dangling cords can lead to appliances being pulled down, causing physical injury or electrical fires.",
    category: "Kitchen",
    difficulty: "easy",
    mode: "general"
  },

  // --- INDUSTRIAL ELECTRICAL SAFETY SCENARIOS (75 Scenarios) ---
  {
    id: 'i1',
    text: "Performing Lockout/Tagout (LOTO) to lock energy sources before repairing a large machine.",
    isSafe: true,
    explanation: "Safe: Lockout/Tagout ensures machines cannot start up unexpectedly while someone is working inside.",
    category: "Maintenance",
    difficulty: "medium",
    mode: "industrial"
  },
  {
    id: 'i2',
    text: "Bypassing a safety guard on a cutting machine because it slows down your production rate.",
    isSafe: false,
    explanation: "Hazard: Guards prevent catastrophic hand and finger injuries. Never bypass or remove safety guards.",
    category: "Operations",
    difficulty: "easy",
    mode: "industrial"
  },
  {
    id: 'i3',
    text: "Using a CAT II-rated multimeter to measure voltage on a high-energy 480V industrial power box.",
    isSafe: false,
    explanation: "Hazard: Industrial power requires CAT III or CAT IV rated meters per IEC standards. CAT II meters can explode in an arc flash.",
    category: "Testing",
    difficulty: "hard",
    mode: "industrial"
  },
  {
    id: 'i4',
    text: "Wearing custom arc-rated (AR) clothing and face shields when switching high-voltage circuit breakers.",
    isSafe: true,
    explanation: "Safe: Arc-rated PPE protects workers from extreme heat and severe burns if an arc flash occurs.",
    category: "PPE",
    difficulty: "medium",
    mode: "industrial"
  },
  {
    id: 'i5',
    text: "Using a high-pressure air hose to blow conductive metallic dust off a live electrical panel.",
    isSafe: false,
    explanation: "Hazard: Blowing conductive dust inside live panels causes short circuits, sparks, and dangerous explosions.",
    category: "Maintenance",
    difficulty: "medium",
    mode: "industrial"
  },
  {
    id: 'i6',
    text: "Placing warning barriers around an open, live electrical panel to keep unqualified workers away.",
    isSafe: true,
    explanation: "Safe: Barriers establish a safe distance and protect passersby from accidental electrical contact.",
    category: "Operations",
    difficulty: "easy",
    mode: "industrial"
  },
  {
    id: 'i7',
    text: "Storing spare metal pipes and steel tools on top of an active motor control cabinet (MCC).",
    isSafe: false,
    explanation: "Hazard: Metal objects can fall through the cabinet's cooling vents and trigger a short circuit or arc flash.",
    category: "Housekeeping",
    difficulty: "medium",
    mode: "industrial"
  },
  {
    id: 'i8',
    text: "Using the 'Live-Dead-Live' test method with your voltage tester to verify the power is 100% off.",
    isSafe: true,
    explanation: "Safe: Testing on a known live source, then the dead target, then the live source again ensures your tester is working correctly.",
    category: "Testing",
    difficulty: "easy",
    mode: "industrial"
  },
  {
    id: 'i9',
    text: "Wearing regular leather work gloves to directly touch and work on a live 277-volt lighting circuit.",
    isSafe: false,
    explanation: "Hazard: Leather gloves offer zero electrical insulation. You must use certified rubber insulating gloves rated for the voltage.",
    category: "PPE",
    difficulty: "hard",
    mode: "industrial"
  },
  {
    id: 'i10',
    text: "Placing clear and visible arc flash hazard labels on all electrical distribution boards.",
    isSafe: true,
    explanation: "Safe: Labels alert workers to the dangerous energy levels and the exact protective gear they need to wear.",
    category: "Compliance",
    difficulty: "easy",
    mode: "industrial"
  },
  {
    id: 'i11',
    text: "Leaving the key in a lockout padlock so that other technicians can remove it quickly if needed.",
    isSafe: false,
    explanation: "Hazard: Each worker must keep their own key. Leaving keys in locks defeats the purpose of individual Lockout/Tagout protection.",
    category: "LOTO",
    difficulty: "medium",
    mode: "industrial"
  },
  {
    id: 'i12',
    text: "Using a portable ladder with aluminum side rails to replace light bulbs in an industrial factory ceiling.",
    isSafe: false,
    explanation: "Hazard: Aluminum is a highly conductive metal. If the ladder touches a wire, it will cause a fatal shock.",
    category: "Safety Equipment",
    difficulty: "medium",
    mode: "industrial"
  },
  {
    id: 'i13',
    text: "Ensuring all electrical panel doors are fully closed and latched shut during normal factory operation.",
    isSafe: true,
    explanation: "Safe: Closed panels contain any internal sparks and prevent dust or accidental human contact with live parts.",
    category: "Compliance",
    difficulty: "easy",
    mode: "industrial"
  },
  {
    id: 'i14',
    text: "Using specialized non-conductive insulated hand tools when working near open, live circuits.",
    isSafe: true,
    explanation: "Safe: Insulated tools are rated to prevent electricity from flowing through the tool to your hand.",
    category: "Tools",
    difficulty: "medium",
    mode: "industrial"
  },
  {
    id: 'i15',
    text: "Running a high-voltage extension cord across a main forklift driving aisle without any protection.",
    isSafe: false,
    explanation: "Hazard: Forklifts can easily crush and slice cords, exposing live wires and causing massive short circuits.",
    category: "Housekeeping",
    difficulty: "easy",
    mode: "industrial"
  },
  {
    id: 'i16',
    text: "Double-checking that a machine's emergency stop (E-STOP) button is fully working before starting a shift.",
    isSafe: true,
    explanation: "Safe: Testing the emergency stop ensures you can instantly shut down the machine if an accident happens.",
    category: "Operations",
    difficulty: "medium",
    mode: "industrial"
  },
  {
    id: 'i17',
    text: "Replacing a blown 10-amp industrial fuse with a copper wire or paperclip because you ran out of fuses.",
    isSafe: false,
    explanation: "Hazard: This bypasses all circuit safety, leading to overheating, machine damage, and catastrophic electrical fires.",
    category: "Maintenance",
    difficulty: "hard",
    mode: "industrial"
  },
  {
    id: 'i18',
    text: "Working alone on a high-voltage power panel without a trained safety buddy or standby person.",
    isSafe: false,
    explanation: "Hazard: If a shock occurs, you need a trained standby worker to cut the power and call for emergency medical help immediately.",
    category: "Operations",
    difficulty: "hard",
    mode: "industrial"
  },
  {
    id: 'i19',
    text: "Inspecting rubber insulating gloves for air leaks by rolling them up to trap air before every use.",
    isSafe: true,
    explanation: "Safe: Air testing detects tiny pinholes or cracks that could let high-voltage electricity leak through to your skin.",
    category: "PPE",
    difficulty: "medium",
    mode: "industrial"
  },
  {
    id: 'i20',
    text: "Using electrical equipment tagged as 'DANGER - DO NOT OPERATE' because the repair is taking too long.",
    isSafe: false,
    explanation: "Hazard: Danger tags mean the machine is unsafe. Operating tagged equipment can lead to severe injury or death.",
    category: "LOTO",
    difficulty: "medium",
    mode: "industrial"
  },
  {
    id: 'i21',
    text: "Allowing only qualified, certified electricians to open and repair electrical panels.",
    isSafe: true,
    explanation: "Safe: Restricting access to trained professionals ensures repairs are done safely and according to code.",
    category: "Compliance",
    difficulty: "easy",
    mode: "industrial"
  },
  {
    id: 'i22',
    text: "Wearing metal rings, watches, and necklaces while working inside an active electrical enclosure.",
    isSafe: false,
    explanation: "Hazard: Metal jewelry is highly conductive and can easily touch live parts, causing severe electrical burns or arc flashes.",
    category: "PPE",
    difficulty: "medium",
    mode: "industrial"
  },
  {
    id: 'i23',
    text: "Installing ground-fault protective devices (GFCI) on all portable power tools used in damp industrial sites.",
    isSafe: true,
    explanation: "Safe: GFCIs protect workers from ground faults and shocks in moist or outdoor environments.",
    category: "Tools",
    difficulty: "medium",
    mode: "industrial"
  },
  {
    id: 'i24',
    text: "Plugging a high-power industrial motor into a circuit with a breaker of a higher rating to prevent it from tripping.",
    isSafe: false,
    explanation: "Hazard: Using an oversized breaker allows too much current to flow, which can melt cables and start fires before tripping.",
    category: "Compliance",
    difficulty: "hard",
    mode: "industrial"
  },
  {
    id: 'i25',
    text: "Conducting a formal pre-job safety briefing with the team before beginning high-voltage substation maintenance.",
    isSafe: true,
    explanation: "Safe: Discussion of roles, hazards, and emergency plans ensures everyone is aligned and works safely.",
    category: "Operations",
    difficulty: "medium",
    mode: "industrial"
  },
  {
    id: 'i26',
    text: "Leaving a heavy electrical distribution panel lying flat on the ground in a muddy, wet trench.",
    isSafe: false,
    explanation: "Hazard: Water and mud can seep into standard industrial enclosures, resulting in catastrophic phase-to-ground faults.",
    category: "Housekeeping",
    difficulty: "hard",
    mode: "industrial"
  },
  {
    id: 'i27',
    text: "Checking the test certification date stamped on high-voltage rubber gloves before starting work.",
    isSafe: true,
    explanation: "Safe: Rubber safety gloves must be tested and re-certified every 6 months to ensure insulation integrity.",
    category: "PPE",
    difficulty: "medium",
    mode: "industrial"
  },
  {
    id: 'i28',
    text: "Using standard home PVC tape to repair insulation on a damaged high-voltage copper busbar.",
    isSafe: false,
    explanation: "Hazard: Ordinary tape is not rated for high-voltage industrial insulation and will melt or fail instantly, causing arc-flash.",
    category: "Maintenance",
    difficulty: "hard",
    mode: "industrial"
  },
  {
    id: 'i29',
    text: "Setting up solid physical barricades and high-voltage warning signs before performing factory tests.",
    isSafe: true,
    explanation: "Safe: Restricts entry and keeps unauthorized personnel out of the active high-voltage hazard zone.",
    category: "Operations",
    difficulty: "easy",
    mode: "industrial"
  },
  {
    id: 'i30',
    text: "Using a standard domestic vacuum cleaner to clean up dry metal shavings inside a motor control room.",
    isSafe: false,
    explanation: "Hazard: Ordinary vacuums are not explosion-proof. Combustible dust inside the vacuum motor can easily spark an explosion.",
    category: "Housekeeping",
    difficulty: "medium",
    mode: "industrial"
  },
  {
    id: 'i31',
    text: "Removing a lockout pad from a breaker yourself because the assigned technician left the factory for the day.",
    isSafe: false,
    explanation: "Hazard: Bypassing a LOTO padlock is a severe safety breach. The technician might still be working on the equipment.",
    category: "LOTO",
    difficulty: "easy",
    mode: "industrial"
  },
  {
    id: 'i32',
    text: "Ensuring all electrical panels have a minimum of 36 inches (0.9 meters) of completely open space in front.",
    isSafe: true,
    explanation: "Safe: Clear working space is legally required by OSHA to allow safe worker operation and immediate emergency exit.",
    category: "Compliance",
    difficulty: "medium",
    mode: "industrial"
  },
  {
    id: 'i33',
    text: "Using a standard pocket flashlight with a metal body to inspect active live motor control terminals.",
    isSafe: false,
    explanation: "Hazard: Metal flashlights are conductive and can bridge phase-to-ground terminals, triggering a catastrophic arc-flash.",
    category: "Tools",
    difficulty: "medium",
    mode: "industrial"
  },
  {
    id: 'i34',
    text: "Verifying that your multimeter and test leads are rated CAT III or CAT IV before testing industrial power gear.",
    isSafe: true,
    explanation: "Safe: Cat-rated equipment ensures the tool can safely withstand high voltage transients without exploding in your hands.",
    category: "Testing",
    difficulty: "medium",
    mode: "industrial"
  },
  {
    id: 'i35',
    text: "Standing on a certified, non-conductive rubber dielectric safety mat while operating high-voltage disconnect switches.",
    isSafe: true,
    explanation: "Safe: The safety mat provides extra insulation, separating your feet from the ground to prevent lethal shock current.",
    category: "Safety Equipment",
    difficulty: "medium",
    mode: "industrial"
  },
  {
    id: 'i36',
    text: "Using a heavy-duty household extension cord as permanent wiring for a 5-ton warehouse crane.",
    isSafe: false,
    explanation: "Hazard: Extension cords are strictly for temporary use. Moving crane loads will quickly pinch, heat, and destroy the cord.",
    category: "Operations",
    difficulty: "hard",
    mode: "industrial"
  },
  {
    id: 'i37',
    text: "Wearing non-conductive safety glasses with side shields whenever working near open electrical panels.",
    isSafe: true,
    explanation: "Safe: Protects eyes from flying debris, copper sparks, and intense ultraviolet radiation from potential arc flashes.",
    category: "PPE",
    difficulty: "easy",
    mode: "industrial"
  },
  {
    id: 'i38',
    text: "Replacing a blown 100-amp power fuse with a thick steel bolt so you can keep the production line moving.",
    isSafe: false,
    explanation: "Hazard: Steel bolts do not melt under high currents. This allows unlimited fault currents to melt cables and start massive fires.",
    category: "Maintenance",
    difficulty: "hard",
    mode: "industrial"
  },
  {
    id: 'i39',
    text: "Inspecting an industrial cabinet door for signs of rust or water leaks before touching the handle.",
    isSafe: true,
    explanation: "Safe: Moisture can turn the metal cabinet skin live, making a simple handle touch potentially fatal.",
    category: "Maintenance",
    difficulty: "medium",
    mode: "industrial"
  },
  {
    id: 'i40',
    text: "Running heavy-voltage power cables directly over the sharp metal edges of structural steel rafters.",
    isSafe: false,
    explanation: "Hazard: Factory vibration will cause the sharp metal to slice through cable insulation over time, causing a direct ground fault.",
    category: "Housekeeping",
    difficulty: "hard",
    mode: "industrial"
  },
  {
    id: 'i41',
    text: "Confirming that all industrial equipment frames are connected directly to the main copper grounding grid.",
    isSafe: true,
    explanation: "Safe: Solid grounding ensures any internal short instantly trips the breaker, rather than making the machine frame lethal to touch.",
    category: "Compliance",
    difficulty: "medium",
    mode: "industrial"
  },
  {
    id: 'i42',
    text: "Using standard NEMA 1 indoor electrical panels in an open factory area subjected to daily water washdowns.",
    isSafe: false,
    explanation: "Hazard: NEMA 1 enclosures are not water-resistant. Water sprayed on them will seep inside, causing explosive shorts and shock hazards.",
    category: "Safety Equipment",
    difficulty: "hard",
    mode: "industrial"
  },
  {
    id: 'i43',
    text: "Conducting a formal documented Risk Assessment before initiating any active work near energized panels.",
    isSafe: true,
    explanation: "Safe: Identifies correct boundary distances, shock hazards, arc flash ratings, and corresponding safety procedures.",
    category: "Operations",
    difficulty: "medium",
    mode: "industrial"
  },
  {
    id: 'i44',
    text: "Using standard metal pliers wrapped in a layer of plastic tape to cut active, live 480V wires.",
    isSafe: false,
    explanation: "Hazard: Tape wrap is not certified electrical insulation. The high voltage will easily break through, giving you a fatal shock.",
    category: "Tools",
    difficulty: "hard",
    mode: "industrial"
  },
  {
    id: 'i45',
    text: "Replacing a damaged heavy industrial motor cord with a certified industrial-grade rubber-jacketed cord.",
    isSafe: true,
    explanation: "Safe: Certified industrial cords withstand high physical impact, chemical exposure, and mechanical stress without failure.",
    category: "Maintenance",
    difficulty: "medium",
    mode: "industrial"
  },
  {
    id: 'i46',
    text: "Carrying a long steel conduit pipe horizontally on your shoulder through an active high-voltage substation yard.",
    isSafe: false,
    explanation: "Hazard: Long conductive materials can easily breach safe approach limits and trigger high-voltage air arcing.",
    category: "Operations",
    difficulty: "hard",
    mode: "industrial"
  },
  {
    id: 'i47',
    text: "Removing all metal rings, watches, and jewelry before performing any service inside an active panel cabinet.",
    isSafe: true,
    explanation: "Safe: Prevents accidental electrical contact, skin-burning faults, and minimizes the risk of triggering an arc flash.",
    category: "PPE",
    difficulty: "medium",
    mode: "industrial"
  },
  {
    id: 'i48',
    text: "Operating a high-voltage safety switch with your head and body standing directly in front of the cabinet door.",
    isSafe: false,
    explanation: "Hazard: If an internal fault occurs during switching, the door can blow open with explosive force. Stand to the side instead.",
    category: "Operations",
    difficulty: "hard",
    mode: "industrial"
  },
  {
    id: 'i49',
    text: "Applying a standard danger tag to a circuit breaker without using a physical padlock.",
    isSafe: false,
    explanation: "Hazard: Tags alone can easily tear off, blow away, or be ignored by mistake. You must use a lock with every LOTO tag.",
    category: "LOTO",
    difficulty: "easy",
    mode: "industrial"
  },
  {
    id: 'i50',
    text: "Using a certified non-contact voltage detector to check for active voltage on a wire before touching.",
    isSafe: true,
    explanation: "Safe: Provides a fast, safe way to confirm a circuit is de-energized without touching live copper.",
    category: "Testing",
    difficulty: "easy",
    mode: "industrial"
  },
  {
    id: 'i51',
    text: "Letting conductive dust and oil grease accumulate inside a high-voltage switchgear cabinet.",
    isSafe: false,
    explanation: "Hazard: Dust and oil buildup can cause tracking, bridging, and catastrophic arc-flash explosions.",
    category: "Housekeeping",
    difficulty: "medium",
    mode: "industrial"
  },
  {
    id: 'i52',
    text: "Employing a dedicated 'safety watch' person whose only job is to stand by and call for help in an emergency.",
    isSafe: true,
    explanation: "Safe: Crucial for high-risk electrical tasks to ensure immediate rescue actions are taken if needed.",
    category: "Operations",
    difficulty: "medium",
    mode: "industrial"
  },
  {
    id: 'i53',
    text: "Using a standard ladder to climb up and inspect an active, unshielded outdoor substation transformer.",
    isSafe: false,
    explanation: "Hazard: Unshielded transformers contain high-voltage terminals that can arc to nearby objects or ladders.",
    category: "Safety Equipment",
    difficulty: "hard",
    mode: "industrial"
  },
  {
    id: 'i54',
    text: "Regularly verifying that all ground fault relays and circuit breakers are calibrated and fully functional.",
    isSafe: true,
    explanation: "Safe: Proper testing ensures that safety devices will trip fast enough to protect human lives.",
    category: "Compliance",
    difficulty: "medium",
    mode: "industrial"
  },
  {
    id: 'i55',
    text: "Storing highly flammable paint thinner cans inside a room filled with high-voltage transformer gear.",
    isSafe: false,
    explanation: "Hazard: Any small spark from the transformers can ignite the volatile fumes, starting a massive fire.",
    category: "Housekeeping",
    difficulty: "easy",
    mode: "industrial"
  },
  {
    id: 'i56',
    text: "Inspecting electrical test leads for cracked insulation, loose probes, or exposed wires before every use.",
    isSafe: true,
    explanation: "Safe: Damaged test leads can expose you to live voltages while measuring.",
    category: "Testing",
    difficulty: "easy",
    mode: "industrial"
  },
  {
    id: 'i57',
    text: "Leaving live, uninsulated wires hanging loose out of a junction box with no wire nuts or insulation tape.",
    isSafe: false,
    explanation: "Hazard: Exposed wires can touch the metal box or nearby people, causing fatal shocks or short circuits.",
    category: "Maintenance",
    difficulty: "easy",
    mode: "industrial"
  },
  {
    id: 'i58',
    text: "Applying your personal lock and tag on a breaker, even though the team leader already has their lock on it.",
    isSafe: true,
    explanation: "Safe: Every individual worker must have their own personal lock for 100% individual LOTO safety.",
    category: "LOTO",
    difficulty: "medium",
    mode: "industrial"
  },
  {
    id: 'i59',
    text: "Using a high-voltage insulated 'hot stick' to safely operate high-voltage disconnect overhead switches.",
    isSafe: true,
    explanation: "Safe: Keeps the operator at a safe distance from high-voltage arc-flash boundaries.",
    category: "Operations",
    difficulty: "medium",
    mode: "industrial"
  },
  {
    id: 'i60',
    text: "Replacing an industrial motor starter with a different model without checking the voltage or current ratings.",
    isSafe: false,
    explanation: "Hazard: Mismatched equipment can fail catastrophically, burn out, or explode under high load.",
    category: "Maintenance",
    difficulty: "hard",
    mode: "industrial"
  },
  {
    id: 'i61',
    text: "Keeping all industrial emergency exit doors and electrical room paths completely clear of pallet storage.",
    isSafe: true,
    explanation: "Safe: Ensures that workers can escape instantly in the event of an arc-flash or fire.",
    category: "Compliance",
    difficulty: "easy",
    mode: "industrial"
  },
  {
    id: 'i62',
    text: "Leaving the metal back-plate of a live 480V motor cabinet completely ungrounded after servicing.",
    isSafe: false,
    explanation: "Hazard: If a hot wire touches the metal plate, the entire cabinet shell will become live and deadly to touch.",
    category: "Maintenance",
    difficulty: "hard",
    mode: "industrial"
  },
  {
    id: 'i63',
    text: "Using a portable power distribution box with ground-fault circuit interrupter (GFCI) outlets on a damp concrete floor.",
    isSafe: true,
    explanation: "Safe: GFCIs protect workers from fatal ground-fault shocks in wet industrial areas.",
    category: "Safety Equipment",
    difficulty: "medium",
    mode: "industrial"
  },
  {
    id: 'i64',
    text: "Splicing two damaged high-voltage cables together by simply twisting the copper strands and wrapping them in standard tape.",
    isSafe: false,
    explanation: "Hazard: Twisting wires creates high resistance, leading to extreme heat, melting, and potential arc flash.",
    category: "Maintenance",
    difficulty: "hard",
    mode: "industrial"
  },
  {
    id: 'i65',
    text: "Verifying that all electrical cabinets are labeled with their maximum operating voltage and power supply source.",
    isSafe: true,
    explanation: "Safe: Clear labeling prevents technicians from working on incorrect equipment or higher-voltage systems.",
    category: "Compliance",
    difficulty: "easy",
    mode: "industrial"
  },
  {
    id: 'i66',
    text: "Storing damp cleaning rags and wet mops inside a high-voltage electrical panel room.",
    isSafe: false,
    explanation: "Hazard: Increased humidity and wet contact hazards raise the risk of catastrophic electrical tracking and shorts.",
    category: "Housekeeping",
    difficulty: "medium",
    mode: "industrial"
  },
  {
    id: 'i67',
    text: "Verifying that the safety interlock switch on an industrial machine door is working properly.",
    isSafe: true,
    explanation: "Safe: Safety interlocks instantly stop hazardous parts from moving when doors are opened.",
    category: "Operations",
    difficulty: "medium",
    mode: "industrial"
  },
  {
    id: 'i68',
    text: "Squeezing two extra thick cables into a conduit that is already packed 100% full.",
    isSafe: false,
    explanation: "Hazard: Overcrowding conduits traps heat and damages wire insulation, leading to dangerous hidden short circuits.",
    category: "Maintenance",
    difficulty: "hard",
    mode: "industrial"
  },
  {
    id: 'i69',
    text: "Checking that all electrical panels are locked to prevent unauthorized entry from untrained personnel.",
    isSafe: true,
    explanation: "Safe: Restricts dangerous access to qualified and certified electricians only.",
    category: "Compliance",
    difficulty: "easy",
    mode: "industrial"
  },
  {
    id: 'i70',
    text: "Resetting an industrial high-power overload relay repeatedly without investigating why the motor is overheating.",
    isSafe: false,
    explanation: "Hazard: Overloading causes wires to melt and can lead to a catastrophic industrial motor fire.",
    category: "Operations",
    difficulty: "hard",
    mode: "industrial"
  },
  {
    id: 'i71',
    text: "Using non-conductive cable protectors to cover heavy power cords running across active pedestrian walkways.",
    isSafe: true,
    explanation: "Safe: Protects cords from mechanical damage and eliminates tripping hazards.",
    category: "Safety Equipment",
    difficulty: "medium",
    mode: "industrial"
  },
  {
    id: 'i72',
    text: "Replacing a high-voltage fuse with a lower voltage rating because it is the same physical size.",
    isSafe: false,
    explanation: "Hazard: Low-voltage fuses cannot handle high-voltage arcs and can explode violently when trying to interrupt a fault.",
    category: "Maintenance",
    difficulty: "hard",
    mode: "industrial"
  },
  {
    id: 'i73',
    text: "Performing a visual inspection of an electrical panel before putting on full Arc Flash PPE.",
    isSafe: true,
    explanation: "Safe: Safe distance observation helps check for visual issues like smoke or damage before getting close.",
    category: "PPE",
    difficulty: "medium",
    mode: "industrial"
  },
  {
    id: 'i74',
    text: "Pulling on a high-voltage heavy cable while it is still actively carrying high current to unplug it.",
    isSafe: false,
    explanation: "Hazard: Disconnecting heavy industrial loads under current can cause a violent and deadly arc-flash explosion.",
    category: "Operations",
    difficulty: "hard",
    mode: "industrial"
  },
  {
    id: 'i75',
    text: "Ensuring that the electrical ground rod is driven deep into the earth per code regulations.",
    isSafe: true,
    explanation: "Safe: Secure grounding routes fault currents safely to the earth, preventing dangerous voltage buildup.",
    category: "Compliance",
    difficulty: "easy",
    mode: "industrial"
  },
  {
    id: 'i76',
    text: "Operating high-voltage switchgear while standing on an insulated rubber safety mat.",
    isSafe: true,
    explanation: "Safe: Dielectric rubber mats provide a critical secondary layer of insulation, protecting the operator from ground-fault paths.",
    category: "Operations",
    difficulty: "medium",
    mode: "industrial"
  },
  {
    id: 'i77',
    text: "Restoring power to an electrical panel before all Lockout/Tagout locks are removed by their respective owners.",
    isSafe: false,
    explanation: "Hazard: Restoring power while someone still has a lock on the panel can energize equipment they are currently working on, causing fatal injuries.",
    category: "LOTO",
    difficulty: "easy",
    mode: "industrial"
  },
  {
    id: 'i78',
    text: "Checking the expiration date on your high-voltage rubber insulating gloves before wearing them.",
    isSafe: true,
    explanation: "Safe: Rubber electrical PPE must be inspected and tested regularly to guarantee its insulation rating remains intact.",
    category: "PPE",
    difficulty: "easy",
    mode: "industrial"
  },
  {
    id: 'i79',
    text: "Using compressed air to clean metal shavings and copper dust off a live electrical control panel.",
    isSafe: false,
    explanation: "Hazard: Blowing conductive metal dust inside a live cabinet will cause a massive short-circuit and potentially trigger an arc flash.",
    category: "Maintenance",
    difficulty: "hard",
    mode: "industrial"
  },
  {
    id: 'i80',
    text: "Leaving a high-voltage substation door unlocked because you plan to return in fifteen minutes.",
    isSafe: false,
    explanation: "Hazard: Unlocked substations allow unauthorized personnel to wander in, exposing them to lethal high-voltage contact.",
    category: "Security",
    difficulty: "easy",
    mode: "industrial"
  },
  {
    id: 'i81',
    text: "Checking that an industrial machine's frame is properly connected to the facility ground grid.",
    isSafe: true,
    explanation: "Safe: Frame grounding ensures that any internal short circuit trips the breaker rather than charging the metal frame with high voltage.",
    category: "Operations",
    difficulty: "medium",
    mode: "industrial"
  },
  {
    id: 'i82',
    text: "Performing electrical troubleshooting alone in a confined high-voltage room without a safety standby person.",
    isSafe: false,
    explanation: "Hazard: High-risk electrical work requires a qualified standby person (safety watch) trained in rescue and CPR.",
    category: "Testing",
    difficulty: "hard",
    mode: "industrial"
  },
  {
    id: 'i83',
    text: "Inspecting a portable generator's frame-to-ground neutral bond before starting a shift.",
    isSafe: true,
    explanation: "Safe: Proper bonding on portable generators ensures that safety devices like GFCIs trip correctly in a fault.",
    category: "Testing",
    difficulty: "medium",
    mode: "industrial"
  },
  {
    id: 'i84',
    text: "Carrying a metal ladder horizontally through a substation yard with overhead conductors.",
    isSafe: false,
    explanation: "Hazard: High-voltage lines can arc across air gaps. Metal ladders should never be used or carried in substation environments.",
    category: "Operations",
    difficulty: "medium",
    mode: "industrial"
  },
  {
    id: 'i85',
    text: "Verifying that all test leads on your industrial multimeter are rated for CAT III/IV 1000V.",
    isSafe: true,
    explanation: "Safe: Test leads must match or exceed the meter's rating to prevent insulation failure and arc flash at measurement points.",
    category: "Testing",
    difficulty: "medium",
    mode: "industrial"
  },
  {
    id: 'i86',
    text: "Storing oily rags and paint thinners inside an active electrical motor control center (MCC) room.",
    isSafe: false,
    explanation: "Hazard: MCC rooms house high-power contactors that can spark. Storing volatile combustibles in these rooms is a severe fire risk.",
    category: "Maintenance",
    difficulty: "easy",
    mode: "industrial"
  },
  {
    id: 'i87',
    text: "Wearing a metal wedding ring and watch while troubleshooting a 480V motor control cabinet.",
    isSafe: false,
    explanation: "Hazard: Metal jewelry is highly conductive and increases the risk of severe contact burns, arc flash initiation, and shock.",
    category: "PPE",
    difficulty: "easy",
    mode: "industrial"
  },
  {
    id: 'i88',
    text: "Ensuring that a lockout lock is individual to you and only you hold the key.",
    isSafe: true,
    explanation: "Safe: To guarantee absolute safety, no one else should be able to remove your lockout lock except you.",
    category: "LOTO",
    difficulty: "easy",
    mode: "industrial"
  },
  {
    id: 'i89',
    text: "De-energizing, locking out, and testing a capacitor bank for zero residual voltage before touching terminals.",
    isSafe: true,
    explanation: "Safe: Capacitors store dangerous electrical energy long after power is cut. They must be safely discharged and verified dead.",
    category: "LOTO",
    difficulty: "hard",
    mode: "industrial"
  },
  {
    id: 'i90',
    text: "Resetting a large industrial motor starter overload relay repeatedly without investigating the cause.",
    isSafe: false,
    explanation: "Hazard: Repeatedly resetting overloads without fixing the root cause will burn out the motor windings or trigger a catastrophic fault.",
    category: "Operations",
    difficulty: "medium",
    mode: "industrial"
  },
  {
    id: 'i91',
    text: "Wearing safety glasses with non-conductive frames during live voltage measurements.",
    isSafe: true,
    explanation: "Safe: Non-conductive frames prevent the glasses from creating a short circuit path if they accidentally slip or contact live points.",
    category: "PPE",
    difficulty: "medium",
    mode: "industrial"
  },
  {
    id: 'i92',
    text: "Disconnecting an active current transformer (CT) secondary wire while the primary circuit is still fully energized.",
    isSafe: false,
    explanation: "Hazard: Open-circuiting a live current transformer produces extremely high, lethal voltages across the open terminals.",
    category: "Operations",
    difficulty: "hard",
    mode: "industrial"
  },
  {
    id: 'i93',
    text: "Placing a warning label on an electrical panel indicating its calculated Arc Flash Boundary distance.",
    isSafe: true,
    explanation: "Safe: Clear arc flash labels warn workers of the exact hazard levels and PPE requirements for that specific cabinet.",
    category: "Compliance",
    difficulty: "medium",
    mode: "industrial"
  },
  {
    id: 'i94',
    text: "Using a standard domestic extension cord to run a heavy 20A industrial magnetic drill press.",
    isSafe: false,
    explanation: "Hazard: Domestic cords cannot handle industrial currents. They will overheat, melt their insulation, and can cause fires or shocks.",
    category: "Operations",
    difficulty: "easy",
    mode: "industrial"
  },
  {
    id: 'i95',
    text: "Installing temporary wiring over a factory floor and leaving it unprotected from forklift traffic.",
    isSafe: false,
    explanation: "Hazard: Heavy vehicles can crush wires, exposing live conductors and creating extreme shock or fire hazards.",
    category: "Operations",
    difficulty: "easy",
    mode: "industrial"
  },
  {
    id: 'i96',
    text: "Using insulated hand tools rated for 1000V when working near energized low-voltage conductors.",
    isSafe: true,
    explanation: "Safe: Double-insulated tools protect the user from electrical shock if a tool slips and contacts a live terminal.",
    category: "PPE",
    difficulty: "medium",
    mode: "industrial"
  },
  {
    id: 'i97',
    text: "Removing a Lockout/Tagout lock with bolt cutters because the technician who placed it went home.",
    isSafe: false,
    explanation: "Hazard: Cutting locks is strictly prohibited without a rigorous administrative verification process to guarantee the worker's safety.",
    category: "LOTO",
    difficulty: "hard",
    mode: "industrial"
  },
  {
    id: 'i98',
    text: "Checking the pressure-relief valve on oil-filled transformer tanks during routine maintenance.",
    isSafe: true,
    explanation: "Safe: Properly operating safety valves prevent explosive pressure buildup inside oil-filled high-voltage equipment.",
    category: "Maintenance",
    difficulty: "medium",
    mode: "industrial"
  },
  {
    id: 'i99',
    text: "Applying duct tape over an electrical breaker toggle to keep it from tripping.",
    isSafe: false,
    explanation: "Hazard: Forcing a breaker to stay closed overrides its automatic trip mechanism, causing wires to melt and start a catastrophic fire.",
    category: "Maintenance",
    difficulty: "hard",
    mode: "industrial"
  },
  {
    id: 'i100',
    text: "Using a qualified electrical thermal imaging camera to scan panels for hot, loose connections.",
    isSafe: true,
    explanation: "Safe: Infrared thermography identifies loose lugs and hot spots safely before they turn into major equipment failures.",
    category: "Testing",
    difficulty: "medium",
    mode: "industrial"
  },
  {
    id: 'i101',
    text: "Climbing an electrical pole or tower without wearing a fall-arrest harness and safety lanyard.",
    isSafe: false,
    explanation: "Hazard: Working at heights on utility assets without proper fall protection poses an immediate, life-threatening fall risk.",
    category: "Operations",
    difficulty: "easy",
    mode: "industrial"
  },
  {
    id: 'i102',
    text: "Verifying the absence of voltage on a circuit by testing on a known live source both before and after checking.",
    isSafe: true,
    explanation: "Safe: The 'Test-Before-Touch' (Live-Dead-Live) method guarantees your voltmeter is actually working before you trust it with your life.",
    category: "Testing",
    difficulty: "hard",
    mode: "industrial"
  },
  {
    id: 'i103',
    text: "Leaving copper wire clippings and metal debris inside an electrical cabinet after completing a repair.",
    isSafe: false,
    explanation: "Hazard: Loose conductive debris can bridge live terminals or fall into contactors, causing short circuits or arc flash events.",
    category: "Maintenance",
    difficulty: "medium",
    mode: "industrial"
  },
  {
    id: 'i104',
    text: "Using non-contact voltage detectors as the sole verification method before touching high-voltage conductors.",
    isSafe: false,
    explanation: "Hazard: Non-contact testers are great for quick checks, but you must use a contact-type voltmeter to verify absence of voltage for work.",
    category: "Testing",
    difficulty: "medium",
    mode: "industrial"
  },
  {
    id: 'i105',
    text: "Ensuring that your personal arc flash suit is rated for the correct incident energy level of the cabinet.",
    isSafe: true,
    explanation: "Safe: PPE must have an ATPV rating (cal/cm²) that matches or exceeds the calculated arc hazard level of the equipment.",
    category: "PPE",
    difficulty: "medium",
    mode: "industrial"
  },
  {
    id: 'i106',
    text: "Using water to clean dust off the ceramic insulators inside a high-voltage substation yard.",
    isSafe: false,
    explanation: "Hazard: Water on active high-voltage insulators will cause a massive flashover and ground fault, causing damage and danger.",
    category: "Operations",
    difficulty: "hard",
    mode: "industrial"
  },
  {
    id: 'i107',
    text: "Reporting a damaged electrical conduit that has been dented by a forklift to maintenance.",
    isSafe: true,
    explanation: "Safe: Dented conduit can pinch internal wires, creating a hidden short circuit that can eventually energize the metal conduit pipe.",
    category: "Compliance",
    difficulty: "easy",
    mode: "industrial"
  },
  {
    id: 'i108',
    text: "Allowing an apprentice to troubleshoot a live 480V panel unsupervised.",
    isSafe: false,
    explanation: "Hazard: Unsupervised, unqualified personnel performing high-risk electrical tasks is illegal and extremely dangerous.",
    category: "Compliance",
    difficulty: "easy",
    mode: "industrial"
  },
  {
    id: 'i109',
    text: "Checking that all cabinet ventilation fans are running to prevent motor control drive overheating.",
    isSafe: true,
    explanation: "Safe: Adequate airflow prevents power electronics from overheating, failing, or causing fires.",
    category: "Operations",
    difficulty: "easy",
    mode: "industrial"
  },
  {
    id: 'i110',
    text: "Replacing a blown industrial fuse with a copper pipe of the same physical dimensions.",
    isSafe: false,
    explanation: "Hazard: Copper pipes do not have overcurrent trip thresholds, removing the safety protection and risking explosion or fire.",
    category: "Maintenance",
    difficulty: "hard",
    mode: "industrial"
  },
  {
    id: 'i111',
    text: "Using a designated insulated rescue hook during high-voltage troubleshooting.",
    isSafe: true,
    explanation: "Safe: A rescue hook allows a standby worker to safely pull an electrocuted victim away from live conductors without getting shocked themselves.",
    category: "PPE",
    difficulty: "medium",
    mode: "industrial"
  },
  {
    id: 'i112',
    text: "Operating a high-voltage disconnect switch slowly and hesitantly to avoid making noise.",
    isSafe: false,
    explanation: "Hazard: Disconnects must be operated quickly and decisively in one single movement to minimize the duration of any electric arcing.",
    category: "Operations",
    difficulty: "medium",
    mode: "industrial"
  },
  {
    id: 'i113',
    text: "Reviewing the safe work permit and risk assessment with the team before starting a complex electrical shift.",
    isSafe: true,
    explanation: "Safe: Pre-job briefings ensure everyone understands the hazards, roles, and emergency procedures.",
    category: "Compliance",
    difficulty: "easy",
    mode: "industrial"
  },
  {
    id: 'i114',
    text: "Leaving the protective barriers (dead fronts) off an open, energized panel in a busy hallway.",
    isSafe: false,
    explanation: "Hazard: Open, unguarded panels pose an extreme shock hazard to passersby who might accidentally touch live components.",
    category: "Operations",
    difficulty: "easy",
    mode: "industrial"
  },
  {
    id: 'i115',
    text: "Verifying that all lockable electrical enclosures are securely padlocked and restricted to qualified personnel.",
    isSafe: true,
    explanation: "Safe: Restricted access ensures only trained individuals who understand the hazards can enter electrical spaces.",
    category: "Security",
    difficulty: "easy",
    mode: "industrial"
  },
  {
    id: 'i116',
    text: "Wearing synthetic polyester or nylon clothing under your arc flash protective overalls.",
    isSafe: false,
    explanation: "Hazard: Synthetic materials like polyester can melt into your skin under the extreme heat of an arc flash, causing catastrophic burns.",
    category: "PPE",
    difficulty: "medium",
    mode: "industrial"
  },
  {
    id: 'i117',
    text: "Keeping a fire extinguisher rated Class C (electrical) easily accessible near the main electrical room.",
    isSafe: true,
    explanation: "Safe: Class C extinguishers are non-conductive and specifically rated to put out electrical fires safely.",
    category: "Security",
    difficulty: "easy",
    mode: "industrial"
  },
  {
    id: 'i118',
    text: "Testing your rubber electrical gloves for microscopic leaks by rolling them up to trap air and listening for hisses.",
    isSafe: true,
    explanation: "Safe: The air-roll test is a quick, vital daily check to ensure the rubber is free of pinholes before use.",
    category: "Testing",
    difficulty: "medium",
    mode: "industrial"
  },
  {
    id: 'i119',
    text: "Sweeping floor water towards an active, open-door motor controller cabinet to clean up.",
    isSafe: false,
    explanation: "Hazard: Pushing water near live electrical systems risks bringing conducting fluids into contact with active power nodes.",
    category: "Maintenance",
    difficulty: "easy",
    mode: "industrial"
  },
  {
    id: 'i120',
    text: "Turning your face away from an electrical breaker cabinet when flipping a high-amperage switch.",
    isSafe: true,
    explanation: "Safe: Turning your head away and standing on the hinge side protects your face and eyes if a catastrophic breaker failure (arc flash) occurs.",
    category: "Operations",
    difficulty: "medium",
    mode: "industrial"
  },
  {
    id: 'i121',
    text: "Using a standard pocket knife to strip insulation off a live industrial control cable.",
    isSafe: false,
    explanation: "Hazard: Using a standard, non-insulated knife on a live cable presents a massive risk of hand-to-conductor shock.",
    category: "Operations",
    difficulty: "hard",
    mode: "industrial"
  },
  {
    id: 'i122',
    text: "Checking that electrical cable trays are kept clear of trash, dust, and general storage items.",
    isSafe: true,
    explanation: "Safe: Cable trays need ventilation to dissipate heat from power cables; trash accumulation also poses a major fire hazard.",
    category: "Maintenance",
    difficulty: "easy",
    mode: "industrial"
  },
  {
    id: 'i123',
    text: "Painting over the nameplate or warning labels of an industrial motor during a cleanup.",
    isSafe: false,
    explanation: "Hazard: Warning labels and nameplates provide critical operating parameters, voltages, and safety guidelines that must remain visible.",
    category: "Compliance",
    difficulty: "easy",
    mode: "industrial"
  },
  {
    id: 'i124',
    text: "Performing a pre-work inspection on your personal safety harness to check for frayed straps or loose buckles.",
    isSafe: true,
    explanation: "Safe: Inspecting fall protection gear before climbing utility structures ensures the equipment will hold in a fall.",
    category: "PPE",
    difficulty: "easy",
    mode: "industrial"
  },
  {
    id: 'i125',
    text: "Leaving wire connection terminal screws loose inside a heavy vibration cabinet to avoid over-tightening.",
    isSafe: false,
    explanation: "Hazard: Loose connections in vibration environments lead to high resistance, sparking, overheating, and fire.",
    category: "Maintenance",
    difficulty: "medium",
    mode: "industrial"
  }
];

export const ACHIEVEMENTS_DATA: Achievement[] = [
  { id: 'first_blood', title: 'First Spark', description: 'Play your first game of Safety Swipe.', icon: '⚡', unlocked: false },
  { id: 'streak_5', title: 'On Fire', description: 'Reach a streak of 5 correct answers.', icon: '🔥', unlocked: false },
  { id: 'streak_10', title: 'Unstoppable', description: 'Reach a streak of 10 correct answers.', icon: '🚀', unlocked: false },
  { id: 'score_1500_ach', title: 'Compliance Star', description: 'Score over 150 points in a single game.', icon: '🌟', unlocked: false },
  { id: 'score_5000', title: 'Electrical Expert', description: 'Score over 500 points in a single game.', icon: '🏆', unlocked: false },
  { id: 'perfect_run', title: 'Flawless Inspector', description: 'Answer 15 questions correctly without losing a life.', icon: '⭐', unlocked: false },
  { id: 'perfect_triple', title: 'Triple Threat', description: 'Perform 3 perfect timing swipes in a row.', icon: '✨', unlocked: false },
  { id: 'sudden_death_unlock', title: 'Fearless Auditor', description: 'Brave the Sudden Death speed round.', icon: '💀', unlocked: false },
  { id: 'sudden_master', title: 'Blitz Legend', description: 'Score 200+ points in Sudden Death mode.', icon: '🏎️', unlocked: false },
  { id: 'shield_used', title: 'LOTO Savior', description: 'Absorbed a hazard using a LOTO Life Shield.', icon: '🛡️', unlocked: false }
];
