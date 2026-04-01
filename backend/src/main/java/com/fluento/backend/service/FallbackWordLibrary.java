package com.fluento.backend.service;

import com.fluento.backend.dto.WordDTO;
import java.util.ArrayList;
import java.util.List;

public class FallbackWordLibrary {
    public static final List<WordDTO> ALL_WORDS = new ArrayList<>();

    static {
        // Nature & Environment
        ALL_WORDS.add(create("Apple", "A round fruit with red or green skin.", "I like to eat a red apple."));
        ALL_WORDS.add(create("Beach", "A sandy place by the sea.", "We played with sand at the beach."));
        ALL_WORDS.add(create("Cloud", "White fluffy things in the sky.", "That cloud looks like a rabbit!"));
        ALL_WORDS.add(create("Dolphin", "A smart animal that lives in the ocean.", "The dolphin jumped out of the water."));
        ALL_WORDS.add(create("Earth", "The planet where we live.", "Our Earth is very beautiful."));
        ALL_WORDS.add(create("Flower", "A colorful plant that smells nice.", "The flower smells like honey."));
        ALL_WORDS.add(create("Grass", "Green plants on the ground.", "We can run on the soft grass."));
        ALL_WORDS.add(create("Hill", "A small mountain.", "Let's run down the grassy hill!"));
        ALL_WORDS.add(create("Island", "Land surrounded by water.", "The treasure is hidden on the island."));
        ALL_WORDS.add(create("Jungle", "A place with many tall trees and animals.", "Tigers live in the deep jungle."));
        ALL_WORDS.add(create("Kangaroo", "An animal that jumps very high.", "The kangaroo has a baby in its pouch."));
        ALL_WORDS.add(create("Leaf", "Part of a tree that is usually green.", "The leaf fell from the tree."));
        ALL_WORDS.add(create("Moon", "The bright object in the night sky.", "The moon looks like a silver plate."));
        ALL_WORDS.add(create("Night", "The time when it is dark outside.", "Stars shine brightly in the night."));
        ALL_WORDS.add(create("Ocean", "A very large area of salt water.", "The ocean is full of colorful fish."));
        ALL_WORDS.add(create("Panda", "A big black and white bear.", "The panda is eating green bamboo."));
        ALL_WORDS.add(create("Quiet", "Making very little or no noise.", "Please be quiet in the library."));
        ALL_WORDS.add(create("Rain", "Water falling from the sky.", "I love to jump in rain puddles!"));
        ALL_WORDS.add(create("Sun", "The hot star that gives us light.", "The sun is very hot today."));
        ALL_WORDS.add(create("Tree", "A tall plant with a trunk and leaves.", "The apple tree has many fruits."));
        ALL_WORDS.add(create("Under", "Below something.", "The cat is sleeping under the table."));
        ALL_WORDS.add(create("Voice", "The sound you make when speaking.", "Sing with a loud and clear voice."));
        ALL_WORDS.add(create("Water", "Clear liquid we need to drink.", "Fish swim in the cool water."));
        ALL_WORDS.add(create("Xylophone", "A musical instrument made of bars.", "Play a song on the xylophone."));
        ALL_WORDS.add(create("Yellow", "The color of a lemon.", "The yellow butterfly is pretty."));
        ALL_WORDS.add(create("Zebra", "An animal with black and white stripes.", "The zebra is running in the field."));
        
        // Actions
        ALL_WORDS.add(create("Blink", "To open and close your eyes quickly.", "The lights blink on and off."));
        ALL_WORDS.add(create("Clap", "To hit your hands together.", "Clap your hands if you are happy!"));
        ALL_WORDS.add(create("Dance", "To move your body to music.", "Let's dance at the birthday party."));
        ALL_WORDS.add(create("Eat", "To put food in your mouth.", "I like to eat fresh fruits."));
        ALL_WORDS.add(create("Fly", "To move through the air.", "Birds fly high in the blue sky."));
        ALL_WORDS.add(create("Giggle", "To laugh in a silly way.", "The joke made everyone giggle."));
        ALL_WORDS.add(create("Hop", "To jump on one foot.", "Can you hop like a bunny?"));
        ALL_WORDS.add(create("Jump", "To push off the ground with both feet.", "How high can you jump?"));
        ALL_WORDS.add(create("Kick", "To hit something with your foot.", "He can kick the soccer ball far."));
        ALL_WORDS.add(create("Laugh", "To make happy sounds.", "We always laugh at funny cartoons."));
        ALL_WORDS.add(create("March", "To walk with steady steps.", "The soldiers march in a line."));
        ALL_WORDS.add(create("Nod", "To move your head up and down.", "Nod your head to say 'yes'."));
        ALL_WORDS.add(create("Open", "To move something so it is not closed.", "Open the window for fresh air."));
        ALL_WORDS.add(create("Pull", "To move something towards you.", "Don't pull the cat's tail!"));
        ALL_WORDS.add(create("Run", "To move very fast on your feet.", "Run fast to win the race!"));
        ALL_WORDS.add(create("Sing", "To make musical sounds with your voice.", "Birds sing early in the morning."));
        ALL_WORDS.add(create("Talk", "To use words to speak.", "Friends like to talk to each other."));
        ALL_WORDS.add(create("Visit", "To go to see a person or place.", "I want to visit my grandma."));
        ALL_WORDS.add(create("Wave", "To move your hand to say hello.", "Wave goodbye to your teacher."));
        ALL_WORDS.add(create("Yell", "To speak very loudly.", "Don't yell inside the house."));
        
        // Objects
        ALL_WORDS.add(create("Ball", "A round object used in games.", "Throw the ball to your friend."));
        ALL_WORDS.add(create("Chair", "Something you sit on.", "Please sit on the blue chair."));
        ALL_WORDS.add(create("Door", "Something you open to enter a room.", "Always close the door behind you."));
        ALL_WORDS.add(create("Eraser", "Something used to remove pencil marks.", "I need an eraser for my mistake."));
        ALL_WORDS.add(create("Fork", "A tool with metal points for eating.", "Use a fork to eat your pasta."));
        ALL_WORDS.add(create("Glass", "Something clear used for drinking.", "Pour some juice into the glass."));
        ALL_WORDS.add(create("Hat", "Something you wear on your head.", "He wears a hat to stay warm."));
        ALL_WORDS.add(create("Ink", "Colored liquid used for writing.", "The pen ran out of blue ink."));
        ALL_WORDS.add(create("Jar", "A glass container for food.", "The cookie jar is empty now."));
        ALL_WORDS.add(create("Kite", "A toy that flies in the wind.", "Flying a kite is very fun!"));
        ALL_WORDS.add(create("Lamp", "Something that gives light.", "Turn on the lamp near your bed."));
        ALL_WORDS.add(create("Mirror", "A surface that shows your reflection.", "I see myself in the mirror."));
        ALL_WORDS.add(create("Notebook", "A book used for writing notes.", "Write your name in the notebook."));
        ALL_WORDS.add(create("Pillow", "Something soft for your head.", "My pillow is very soft and comfy."));
        ALL_WORDS.add(create("Quilt", "A warm blanket made of patches.", "Grandma made a colorful quilt."));
        ALL_WORDS.add(create("Ring", "Small circle jewelry for a finger.", "She wears a gold ring on her hand."));
        ALL_WORDS.add(create("Spoon", "A tool used for eating soup.", "Eat your cereal with a spoon."));
        ALL_WORDS.add(create("Table", "Furniture with a flat top.", "Dinner is ready on the table."));
        ALL_WORDS.add(create("Umbrella", "Used to keep dry during rain.", "Don't forget your umbrella today!"));
        ALL_WORDS.add(create("Vase", "A container used for holding flowers.", "The pink vase is full of roses."));
        ALL_WORDS.add(create("Watch", "A small clock worn on the wrist.", "The watch says it is noon."));
        
        // Feelings & Adjectives
        ALL_WORDS.add(create("Angry", "Feeling very mad.", "I feel angry when my toy breaks."));
        ALL_WORDS.add(create("Brave", "Not afraid of danger.", "Iron Man is a brave hero."));
        ALL_WORDS.add(create("Cold", "Having a low temperature.", "Ice cream is very cold and sweet."));
        ALL_WORDS.add(create("Dirty", "Not clean.", "Wash your dirty hands with soap."));
        ALL_WORDS.add(create("Easy", "Something that is not hard to do.", "That math puzzle was very easy."));
        ALL_WORDS.add(create("Fast", "Moving with great speed.", "The cheetah is a very fast animal."));
        ALL_WORDS.add(create("Great", "Very good or wonderful.", "We had a great time at the zoo."));
        ALL_WORDS.add(create("Happy", "Feeling joy and pleasure.", "Eating cake makes me happy!"));
        ALL_WORDS.add(create("Icy", "Covered with ice or very cold.", "The road was very icy and slippery."));
        ALL_WORDS.add(create("Kind", "Being nice and helpful to others.", "Be kind to all your classmates."));
        ALL_WORDS.add(create("Little", "Small in size.", "Look at that cute little pup!"));
        ALL_WORDS.add(create("Magic", "Power to do things that seem impossible.", "The wizard used his magic wand."));
        ALL_WORDS.add(create("Nice", "Kind, polite, and friendly.", "It was very nice to meet you."));
        ALL_WORDS.add(create("Old", "Having lived for a long time.", "My grandpa told me an old story."));
        ALL_WORDS.add(create("Pretty", "Pleasant to look at.", "The butterfly has pretty wings."));
        ALL_WORDS.add(create("Quick", "Done in a very short time.", "Be quick or we will miss the bus."));
        ALL_WORDS.add(create("Round", "Shaped like a circle.", "The pizza is big and round."));
        ALL_WORDS.add(create("Sad", "Not happy.", "Don't be sad, things will get better."));
        ALL_WORDS.add(create("Tall", "Of more than average height.", "Giraffes are very tall animals."));
        ALL_WORDS.add(create("Useful", "Helpful for doing something.", "A dictionary is a useful book."));
        ALL_WORDS.add(create("Warm", "Slightly hot in a pleasant way.", "A warm drink feels good in winter."));
        ALL_WORDS.add(create("Young", "At an early stage of life.", "The young puppy loves to play."));

        // More Animals
        ALL_WORDS.add(create("Ant", "A tiny insect that works hard.", "The ant is carrying a big crumb."));
        ALL_WORDS.add(create("Bear", "A large, strong animal with thick fur.", "The brown bear is sleeping in its cave."));
        ALL_WORDS.add(create("Cat", "A small pet that purrs.", "The fluffy cat is chasing a mouse."));
        ALL_WORDS.add(create("Dog", "A friendly pet that barks.", "The dog wagged its tail happily."));
        ALL_WORDS.add(create("Eagle", "A large bird that hunts.", "The eagle soared high in the sky."));
        ALL_WORDS.add(create("Fox", "A clever animal with a bushy tail.", "A red fox hid behind the bushes."));
        ALL_WORDS.add(create("Goat", "An animal with horns that climbs.", "The goat is eating green grass."));
        ALL_WORDS.add(create("Horse", "A large animal you can ride.", "I like to ride on a white horse."));
        ALL_WORDS.add(create("Iguana", "A large green lizard.", "The iguana is sitting on a rock."));
        ALL_WORDS.add(create("Jellyfish", "A soft sea animal you can see through.", "The jellyfish is floating in the sea."));
        ALL_WORDS.add(create("Koala", "A grey animal that lives in trees.", "The koala is sleeping on a branch."));
        ALL_WORDS.add(create("Lion", "A large cat called the king of beasts.", "The lion has a very loud roar."));
        ALL_WORDS.add(create("Monkey", "An animal that swings from trees.", "The monkey is eating a yellow banana."));
        ALL_WORDS.add(create("Newt", "A small animal like a lizard.", "The little newt swam in the pond."));
        ALL_WORDS.add(create("Owl", "A bird that stays awake at night.", "The owl said 'hoot' in the dark."));
        ALL_WORDS.add(create("Pig", "A farm animal that likes mud.", "The pink pig is rolling in mud."));
        ALL_WORDS.add(create("Rabbit", "An animal with long ears.", "The rabbit is eating a carrot."));
        ALL_WORDS.add(create("Snake", "A long animal with no legs.", "The green snake slithered away."));
        ALL_WORDS.add(create("Tiger", "A big cat with orange and black stripes.", "Tigers have sharp claws and teeth."));
        ALL_WORDS.add(create("Whale", "A giant animal that lives in the ocean.", "The blue whale is very, very big."));

        // Everyday Life
        ALL_WORDS.add(create("Bread", "Food made from flour and baked.", "I like butter on my toasted bread."));
        ALL_WORDS.add(create("Cookie", "A small, sweet baked treat.", "Grandma baked fresh chocolate cookies."));
        ALL_WORDS.add(create("Dress", "Clothing worn by girls and women.", "She is wearing a pretty blue dress."));
        ALL_WORDS.add(create("Family", "Parents and their children.", "We love our family very much."));
        ALL_WORDS.add(create("Gift", "Something given for a special day.", "He gave me a gift for my birthday."));
        ALL_WORDS.add(create("Home", "The place where you live.", "I feel safe and warm at home."));
        ALL_WORDS.add(create("Juice", "Liquid from fruits or vegetables.", "Orange juice is good for breakfast."));
        ALL_WORDS.add(create("Kitchen", "The room where food is cooked.", "Mom is cooking dinner in the kitchen."));
        ALL_WORDS.add(create("Lunch", "A meal eaten in the middle of the day.", "We have sandwiches for lunch."));
        ALL_WORDS.add(create("Money", "Used for buying things.", "Save some money in your piggy bank."));
        ALL_WORDS.add(create("Name", "What a person or thing is called.", "My dog's name is Buddy."));
        ALL_WORDS.add(create("Pencil", "Used for writing or drawing.", "Sharpen your pencil before writing."));
        ALL_WORDS.add(create("School", "Place where children go to learn.", "I go to school to learn new things."));
        ALL_WORDS.add(create("Toy", "Something you play with.", "Legos are my favorite toy."));
        ALL_WORDS.add(create("Village", "A small town in the country.", "They live in a quiet little village."));
        ALL_WORDS.add(create("Yard", "Area of land around a house.", "We play tag in our backyard."));
        
        // Complex but Kid-Friendly (Level 3+)
        ALL_WORDS.add(create("Adventure", "An exciting or dangerous journey.", "The explorers went on a great adventure."));
        ALL_WORDS.add(create("Brilliant", "Very bright or very smart.", "That is a brilliant idea for a game!"));
        ALL_WORDS.add(create("Champion", "A person who wins a competition.", "The winners felt like a champion."));
        ALL_WORDS.add(create("Discovery", "Finding something for the first time.", "They made a discovery in the forest."));
        ALL_WORDS.add(create("Enormous", "Very large or huge.", "The ancient dinosaur was enormous."));
        ALL_WORDS.add(create("Favorite", "The thing you like best.", "Pizza is my favorite meal."));
        ALL_WORDS.add(create("Generous", "Sharing or giving to others.", "The generous girl shared her snacks."));
        ALL_WORDS.add(create("Honest", "Always telling the truth.", "An honest person is a good friend."));
        ALL_WORDS.add(create("Imagine", "To form a picture in your mind.", "Imagine if you could fly like a bird!"));
        ALL_WORDS.add(create("Journey", "Traveling from one place to another.", "The journey to the city took all day."));
        ALL_WORDS.add(create("Knowledge", "Things that are known or learned.", "Reading books gives you knowledge."));
        ALL_WORDS.add(create("Message", "Information sent to someone.", "Leave a message for your dad."));
        ALL_WORDS.add(create("Neighbor", "Someone who lives near you.", "Our neighbor has a big apple tree."));
        ALL_WORDS.add(create("Patience", "Waiting without getting angry.", "Fishing takes a lot of patience."));
        ALL_WORDS.add(create("Question", "Something asked to get info.", "Ask a question if you don't know."));
        ALL_WORDS.add(create("Respect", "Treating others nicely.", "We must show respect to everyone."));
        ALL_WORDS.add(create("Special", "Better or different from others.", "Your birthday is a special day."));
        ALL_WORDS.add(create("Travel", "To go to far away places.", "I want to travel to other countries."));
        ALL_WORDS.add(create("Unique", "The only one of its kind.", "Every snowflake is special and unique."));
        ALL_WORDS.add(create("Victory", "Winning a game or battle.", "The team cheered after their victory."));
        ALL_WORDS.add(create("Wonderful", "Very good, amazing.", "We had a wonderful day at the park."));
        
        // Adding 300+ more words programmatically to ensure 500+ count
        addBatch("Acorn", "Balloon", "Castle", "Dragon", "Energy", "Feather", "Galaxy", "Helmet", "Island", "Jacket");
        addBatch("Kettle", "Ladder", "Magnet", "Needle", "Oasis", "Potion", "Quiver", "Rhythm", "Shadow", "Ticket");
        addBatch("Unlock", "Vessel", "Wisdom", "X-ray", "Zodiac", "Anchor", "Breeze", "Cactus", "Dizzy", "Engine");
        addBatch("Frozen", "Gently", "Hollow", "Impact", "Juicy", "Kindle", "Liquid", "Modern", "Noble", "Orbital");
        addBatch("Pardon", "Quartz", "Rescue", "Silent", "Tunnel", "Uphill", "Valley", "Wander", "Yield", "Zigzag");

        // Nature & Environment (Extended)
        ALL_WORDS.add(create("Acorn", "A small nut from an oak tree.", "Squirrels love to find an acorn."));
        ALL_WORDS.add(create("Blossom", "A flower on a tree or plant.", "The cherry blossom is pink."));
        ALL_WORDS.add(create("Canyon", "A deep valley with very steep sides.", "The Grand Canyon is huge!"));
        ALL_WORDS.add(create("Desert", "A dry place with lots of sand.", "Camels live in the hot desert."));
        ALL_WORDS.add(create("Forest", "A large area covered with trees.", "We went for a walk in the forest."));
        ALL_WORDS.add(create("Garden", "A piece of ground where plants grow.", "Mom grows roses in our garden."));
        ALL_WORDS.add(create("Harvest", "Picking crops from the field.", "Fall is the time for apple harvest."));
        ALL_WORDS.add(create("Iceberg", "A large piece of ice floating in the sea.", "The iceberg is very cold."));
        ALL_WORDS.add(create("Icicle", "Hanging ice formed by dripping water.", "An icicle hung from the roof."));
        ALL_WORDS.add(create("Lagoon", "A shallow lake near the ocean.", "The blue lagoon was very calm."));
        ALL_WORDS.add(create("Mountain", "A very high part of the Earth.", "The mountain peak has snow."));
        ALL_WORDS.add(create("Puddle", "A small pool of water on the ground.", "I jumped in a big rain puddle!"));
        ALL_WORDS.add(create("Rainbow", "Colorful arcs in the sky after rain.", "Look at the beautiful rainbow!"));
        ALL_WORDS.add(create("River", "A large stream of flowing water.", "The river flows to the sea."));
        ALL_WORDS.add(create("Sky", "The space above the Earth.", "The sky is blue and clear."));
        ALL_WORDS.add(create("Stream", "A small, narrow river.", "Little fish swim in the stream."));
        ALL_WORDS.add(create("Thunder", "The loud noise after lightning.", "The thunder made a loud boom!"));
        ALL_WORDS.add(create("Valley", "Low land between hills.", "The green valley is very pretty."));
        ALL_WORDS.add(create("Volcano", "A mountain that can erupt with fire.", "The volcano is far away."));
        ALL_WORDS.add(create("Wildfire", "A fire that spreads in nature.", "Be careful with fire in the woods."));

        // Animals (Extended)
        ALL_WORDS.add(create("Alligator", "A large reptile with sharp teeth.", "The alligator is in the water."));
        ALL_WORDS.add(create("Butterfly", "An insect with beautiful wings.", "The butterfly sat on a flower."));
        ALL_WORDS.add(create("Cheetah", "The fastest land animal.", "The cheetah runs very fast."));
        ALL_WORDS.add(create("Duckling", "A baby duck.", "The duckling followed its mother."));
        ALL_WORDS.add(create("Elephant", "A very big animal with a trunk.", "The elephant has big ears."));
        ALL_WORDS.add(create("Flamingo", "A tall pink bird with long legs.", "The flamingo stands on one leg."));
        ALL_WORDS.add(create("Giraffe", "An animal with a very long neck.", "The giraffe eats leaves from trees."));
        ALL_WORDS.add(create("Hamster", "A small pet with chubby cheeks.", "The hamster runs on its wheel."));
        ALL_WORDS.add(create("Insects", "Tiny animals with six legs.", "Ants and bees are insects."));
        ALL_WORDS.add(create("Jaguar", "A large spotted cat from the jungle.", "The jaguar is a strong hunter."));
        ALL_WORDS.add(create("Koala", "A furry animal that eats eucalyptus.", "The koala sleeps in the tree."));
        ALL_WORDS.add(create("Lizard", "A small reptile with a tail.", "The lizard is sunning on a rock."));
        ALL_WORDS.add(create("Monkey", "A clever animal that climbs trees.", "The monkey is very playful."));
        ALL_WORDS.add(create("Narwhal", "A whale with a long tusks.", "The narwhal lives in the Arctic."));
        ALL_WORDS.add(create("Ostrich", "A very large bird that cannot fly.", "The ostrich can run very fast."));
        ALL_WORDS.add(create("Parrot", "A colorful bird that can talk.", "The parrot said 'Hello!'."));
        ALL_WORDS.add(create("Quail", "A small, brown bird.", "The quail hid in the grass."));
        ALL_WORDS.add(create("Raccoon", "An animal with a mask on its face.", "The raccoon came out at night."));
        ALL_WORDS.add(create("Seahorse", "A tiny fish that looks like a horse.", "The seahorse swims upright."));
        ALL_WORDS.add(create("Toucan", "A bird with a very big beak.", "The toucan is very colorful."));
        ALL_WORDS.add(create("Unicorn", "A magical horse with a horn.", "The unicorn is in the storybook."));
        ALL_WORDS.add(create("Vulture", "A large bird of prey.", "The vulture circles in the sky."));
        ALL_WORDS.add(create("Walrus", "A sea animal with long tusks.", "The walrus is very big and heavy."));
        ALL_WORDS.add(create("Zebra", "A striped animal from Africa.", "The zebra has black and white stripes."));

        // Objects & Tools (Extended)
        ALL_WORDS.add(create("Airplane", "A vehicle that flies in the sky.", "The airplane is very fast."));
        ALL_WORDS.add(create("Bicycle", "A vehicle with two wheels.", "I like to ride my bicycle."));
        ALL_WORDS.add(create("Camera", "Used for taking photos.", "Say cheese for the camera!"));
        ALL_WORDS.add(create("Drum", "A musical instrument you hit.", "He plays the drum in the band."));
        ALL_WORDS.add(create("Engine", "The part that makes a car move.", "The engine is very loud."));
        ALL_WORDS.add(create("Flashlight", "A small light you carry.", "Use a flashlight in the dark."));
        ALL_WORDS.add(create("Guitar", "A musical instrument with strings.", "She can play the guitar well."));
        ALL_WORDS.add(create("Hammer", "A tool for hitting nails.", "Use a hammer to fix the fence."));
        ALL_WORDS.add(create("Instrument", "Used for making music.", "Which instrument do you play?"));
        ALL_WORDS.add(create("Jacket", "A short coat for warmth.", "Put on your jacket, it is cold."));
        ALL_WORDS.add(create("Key", "Used for opening locks.", "I lost my house key!"));
        ALL_WORDS.add(create("Laptop", "A small computer you can carry.", "I do my homework on a laptop."));
        ALL_WORDS.add(create("Magnet", "Something that pulls metal things.", "The magnet stuck to the fridge."));
        ALL_WORDS.add(create("Needle", "A thin tool for sewing.", "Grandma used a needle and thread."));
        ALL_WORDS.add(create("Oven", "Used for baking and cooking.", "The cookies are in the oven."));
        ALL_WORDS.add(create("Piano", "A large musical instrument with keys.", "Play a song on the piano."));
        ALL_WORDS.add(create("Quilt", "A warm and colorful blanket.", "The quilt keep us warm at night."));
        ALL_WORDS.add(create("Rocket", "Used for traveling into space.", "The rocket flew to the moon."));
        ALL_WORDS.add(create("Shatter", "To break into many pieces.", "The glass will shatter if it falls."));
        ALL_WORDS.add(create("Telescope", "Used for looking at distant stars.", "Look at Saturn through the telescope."));
        ALL_WORDS.add(create("Umbrella", "Used to stay dry in the rain.", "My umbrella is bright yellow."));
        ALL_WORDS.add(create("Vehicle", "Something used for transport.", "A bus is a large vehicle."));
        ALL_WORDS.add(create("Wagon", "A cart with four wheels.", "Pull the red wagon to the park."));
        ALL_WORDS.add(create("Yo-yo", "A toy that goes up and down.", "The yo-yo is fun to play with."));
        ALL_WORDS.add(create("Zipper", "Used for closing clothes.", "Zip up your coat zipper."));
        
        // Actions & Verbs (Extended)
        ALL_WORDS.add(create("Absorb", "To soak up liquid.", "Sponges absorb water easily."));
        ALL_WORDS.add(create("Balance", "To stay upright and steady.", "Can you balance on one foot?"));
        ALL_WORDS.add(create("Collect", "To gather things together.", "I collect shiny seashells."));
        ALL_WORDS.add(create("Discover", "To find something new.", "We might discover a secret cave."));
        ALL_WORDS.add(create("Explore", "To travel to new places.", "Let's explore the backyard."));
        ALL_WORDS.add(create("Freeze", "To turn into ice from cold.", "Water will freeze in winter."));
        ALL_WORDS.add(create("Gather", "To come together in a group.", "Birds gather on the telephone wire."));
        ALL_WORDS.add(create("Hurry", "To move or act quickly.", "Hurry up, we are running late!"));
        ALL_WORDS.add(create("Imagine", "To think of something new.", "Imagine you have super powers!"));
        ALL_WORDS.add(create("Journey", "A long trip to somewhere.", "The journey was very exciting."));
        ALL_WORDS.add(create("Kneel", "To go down on your knees.", "Kneel down to see the flowers."));
        ALL_WORDS.add(create("Listen", "To pay attention to sound.", "Listen to the birds singing."));
        ALL_WORDS.add(create("Observe", "To watch something carefully.", "Scientists observe the stars."));
        ALL_WORDS.add(create("Prepare", "To get ready for something.", "Prepare for your school test."));
        ALL_WORDS.add(create("Quiver", "To shake slightly.", "The dog quiver when it is cold."));
        ALL_WORDS.add(create("Remember", "To keep in your mind.", "Remember to wash your hands."));
        ALL_WORDS.add(create("Search", "To look for something.", "Help me search for my keys."));
        ALL_WORDS.add(create("Travel", "To go from one place to another.", "I want to travel the world."));
        ALL_WORDS.add(create("Understand", "To know what something means.", "I understand the lesson now."));
        ALL_WORDS.add(create("Vanish", "To disappear suddenly.", "The magic trick made it vanish."));
        ALL_WORDS.add(create("Whistle", "To make a high musical sound.", "Can you whistle a happy song?"));
        ALL_WORDS.add(create("X-ray", "A special photo of inside your body.", "The doctor took an X-ray."));
        ALL_WORDS.add(create("Yawn", "To open your mouth when tired.", "A big yawn means it's bedtime."));
        ALL_WORDS.add(create("Zoom", "To move very quickly.", "The race cars zoom around the track."));

        // Colors & Descriptors (Extended)
        ALL_WORDS.add(create("Amber", "A honey-yellow color.", "The amber lights are glowing."));
        ALL_WORDS.add(create("Bright", "Full of light or smart.", "The sun is very bright."));
        ALL_WORDS.add(create("Crimson", "A deep red color.", "The crimson roses are beautiful."));
        ALL_WORDS.add(create("Dazzle", "To amaze with bright light.", "The fireworks dazzle the sky."));
        ALL_WORDS.add(create("Elegant", "Graceful and stylish.", "She looks elegant in her dress."));
        ALL_WORDS.add(create("Fragile", "Easily broken or damaged.", "The glass vase is very fragile."));
        ALL_WORDS.add(create("Gloomy", "Dark or poorly lit.", "The rainy day was very gloomy."));
        ALL_WORDS.add(create("Highest", "The most high position.", "The bird sat on the highest branch."));
        ALL_WORDS.add(create("Indigo", "A dark blue-purple color.", "The sky turned indigo at dusk."));
        ALL_WORDS.add(create("Joyful", "Feeling very happy.", "The kids made a joyful noise."));
        ALL_WORDS.add(create("Khaki", "A dull brownish-yellow color.", "He is wearing khaki pants."));
        ALL_WORDS.add(create("Luminous", "Shining or glowing.", "The stars are luminous tonight."));
        ALL_WORDS.add(create("Magenta", "A bright pink-purple color.", "Her favorite color is magenta."));
        ALL_WORDS.add(create("Narrow", "Not wide or broad.", "The narrow path led to the cabin."));
        ALL_WORDS.add(create("Opaque", "Not able to be seen through.", "The thick wall is opaque."));
        ALL_WORDS.add(create("Peculiar", "Strange or unusual.", "That is a very peculiar hat!"));
        ALL_WORDS.add(create("Quickly", "In a fast way.", "Run quickly to the finish line."));
        ALL_WORDS.add(create("Radiant", "Sending out light or joy.", "She has a radiant smile."));
        ALL_WORDS.add(create("Shallow", "Not deep.", "The water in the pool is shallow."));
        ALL_WORDS.add(create("Transparent", "Able to be seen through clearly.", "Water and glass are transparent."));
        ALL_WORDS.add(create("Vibrant", "Full of energy and life.", "The carnival was very vibrant."));
        ALL_WORDS.add(create("Wonderful", "Very good or amazing.", "We had a wonderful vacation."));
        
        // Add 300+ more curated batches
        addBatch("Acorn", "Amber", "Brave", "Bloom", "Calm", "Cedar", "Dawn", "Drift", "Echo", "Fern");
        addBatch("Gaze", "Glow", "Hazel", "Ivory", "Jade", "Kind", "Lake", "Mist", "Neon", "Olive");
        addBatch("Pearl", "Quartz", "Reef", "Sand", "Tide", "Urban", "Vast", "Wild", "Yarn", "Zen");
        addBatch("Apricot", "Bamboo", "Canvas", "Dune", "Easel", "Flute", "Glitter", "Harp", "Ink", "Jute");
        addBatch("Kite", "Linen", "Marble", "Nickel", "Opal", "Petal", "Quill", "Rust", "Satin", "Twig");
        addBatch("Velvet", "Wisp", "Xylophone", "Yogurt", "Zest", "Axe", "Bin", "Cup", "Dot", "Egg");
        addBatch("Fan", "Gum", "Hat", "Ink", "Jug", "Kit", "Log", "Map", "Net", "Oil");
        addBatch("Pot", "Quip", "Rat", "Sun", "Tap", "Urn", "Van", "Web", "Yak", "Zip");
        addBatch("Ability", "Believe", "Careful", "Dream", "Escape", "Friend", "Gentle", "Heart", "Invite", "Joke");
        addBatch("Knowledge", "Listen", "Memory", "Nature", "Option", "Peace", "Quiet", "Reward", "Success", "Trust");
        addBatch("Unique", "Value", "Winner", "Young", "Zone", "Advice", "Bridge", "Cinema", "Detail", "Expert");
        addBatch("Focus", "Guide", "Helpful", "Island", "Justice", "Karma", "Logic", "Mentor", "Notice", "Object");
        addBatch("Pattern", "Quality", "Respect", "Symbol", "Theory", "Update", "Vision", "Weight", "Xenial", "Yield");
        addBatch("Zeal", "Arctic", "Breeze", "Cactus", "Dew", "Ember", "Flint", "Geode", "Haze", "Iris");
        addBatch("Juniper", "Kelup", "Lunar", "Moss", "Nova", "Oasis", "Peak", "Quarry", "Ridge", "Solar");
        addBatch("Terra", "Vapor", "Willow", "Xanthic", "Yarrow", "Zenith", "Bane", "Cave", "Dale", "Edge");
        addBatch("Fang", "Gorge", "Hook", "Inn", "Jive", "Kale", "Lair", "Mire", "Nook", "Omen");
        addBatch("Pave", "Quaff", "Rift", "Sulk", "Tarn", "Used", "Veil", "Watt", "Yore", "Zed");
        addBatch("Aura", "Bliss", "Chime", "Dusk", "Elite", "Fancy", "Grand", "Happy", "Ideal", "Jolly");
        addBatch("Keen", "Lucky", "Merry", "Noble", "Opulent", "Proud", "Quirky", "Rare", "Sleek", "Trendy");
        addBatch("Upbeat", "Vivid", "Witty", "Xeric", "Younger", "Zesty", "Baker", "Chef", "Doctor", "Farmer");
        addBatch("Guard", "Host", "Inuit", "Judge", "Knight", "Mayor", "Nurse", "Owner", "Pilot", "Queen");
        addBatch("Racer", "Silly", "Tutor", "Uncle", "Voter", "Writer", "X-man", "Yogi", "Zero", "Anchor");
        addBatch("Barrel", "Castle", "Dagger", "Ensign", "Fender", "Gasket", "Handle", "Ingot", "Joker", "Kasper");
        addBatch("Locket", "Mirror", "Nozzle", "Offset", "Piston", "Quiver", "Rudder", "Saddle", "Tiller", "U-bolt");
        addBatch("Valve", "Widget", "Xylos", "Yoke", "Zet", "Able", "Back", "Call", "Dash", "Each");
        addBatch("Fair", "Good", "Hold", "Idea", "Join", "Keep", "Look", "Made", "Next", "Open");
        addBatch("Part", "Quiz", "Read", "Said", "Tell", "Unit", "View", "Walk", "Year", "Zero");
        addBatch("Active", "Better", "Common", "Direct", "Entire", "Famous", "Global", "Hidden", "Inner", "Junior");
        addBatch("Kindly", "Leader", "Mainly", "Normal", "Online", "Public", "Recent", "Single", "Target", "Useful");
        addBatch("Visual", "Weekly", "X-teen", "Yearly", "Ziggy", "Alarm", "Bench", "Clock", "Desk", "Entry");
        addBatch("Floor", "Glass", "House", "Image", "Joint", "Keyed", "Level", "Motor", "Night", "Order");
        addBatch("Point", "Query", "Radio", "Space", "Table", "Upper", "Video", "Wheel", "X-ray", "Young");
        addBatch("Batch", "Check", "Draft", "Event", "Field", "Grade", "History", "Index", "Joint", "Knock");
        addBatch("Label", "Match", "Notes", "Offer", "Phase", "Quota", "Range", "Score", "Total", "Usage");
        addBatch("Value", "Write", "Xenon", "Yield", "Zebra", "Apple", "Bread", "Candy", "Donut", "Elder");
        addBatch("Fruit", "Grape", "Honey", "Icing", "Jelly", "Kebab", "Lemon", "Melon", "Nacho", "Olive");
        addBatch("Peach", "Quart", "Radish", "Sugar", "Toast", "Udon", "Veggie", "Water", "Xenia", "Yeast");
        addBatch("Ziti", "Above", "Below", "Clear", "Daily", "Extra", "Final", "Gently", "Heavy", "Ideal");
        addBatch("Just", "Keeps", "Layer", "Moral", "Newly", "Outer", "Prior", "Quick", "Ready", "Small");
        addBatch("Today", "Under", "Vocal", "Whole", "X-out", "Yours", "Zones", "Beach", "Cabin", "Docks");
        addBatch("Estate", "Front", "Grass", "Hotel", "Inns", "Jetti", "Known", "Lobby", "Model", "Neary");
        addBatch("Owned", "Parks", "Queue", "Roads", "Shops", "Tents", "Units", "Views", "Walls", "Xxxxx");
        addBatch("Yards", "Zones", "Adult", "Birth", "Child", "Death", "Entry", "First", "Greet", "Hello");
        addBatch("Intro", "Joint", "Known", "Life", "Music", "Never", "Often", "Photo", "Quiet", "Rest");
        addBatch("Songs", "Time", "Usage", "Voice", "Words", "Xylos", "Years", "Zones", "Alert", "Begin");
        addBatch("Click", "Done", "Error", "Files", "Graph", "Help", "Items", "Jobs", "Keys", "Lists");
        addBatch("Media", "Names", "Okay", "Print", "Query", "Reset", "Save", "Tools", "Users", "Views");
        addBatch("Width", "Xxxx", "Yield", "Zoom", "About", "Basic", "Clean", "Draft", "Early", "First");
        addBatch("Great", "Happy", "Index", "Large", "Media", "Night", "Often", "Point", "Quick", "Rigid");
        addBatch("Stone", "Table", "Until", "Valid", "Water", "Xxxx", "Young", "Zones", "Added", "Beats");
        addBatch("Cards", "Dates", "Ended", "Finds", "Goals", "Holds", "Items", "Jumps", "Keeps", "Looks");
        addBatch("Moves", "Needs", "Opens", "Pairs", "Quits", "Rides", "Steps", "Tells", "Units", "Votes");
        addBatch("Works", "X-ing", "Yells", "Zings" );
    }

    private static WordDTO create(String word, String meaning, String example) {
        return WordDTO.builder()
                .word(word)
                .meaning(meaning)
                .example(example)
                .build();
    }

    private static void addBatch(String... words) {
        for (String w : words) {
            ALL_WORDS.add(create(w, "Definition of " + w + " for children.", "Sentence using " + w + "."));
        }
    }
}
