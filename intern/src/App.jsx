import React, { useState } from "react";
import {
  Utensils,
  Flame,
  Leaf,
  Apple,
  ShieldAlert,
  Sparkles,
  RefreshCw,
} from "lucide-react";

// Mock database of meals tailored to preferences
const   MEAL_DATABASE = {
  lose_weight: {
    any: [
      {
        type: "Breakfast",
        name: "Berry Protein Oatmeal",
        calories: 320,
        carbs: "45g",
        protein: "20g",
        fat: "6g",
        ingredients: [
          "Rolled oats",
          "Whey protein",
          "Mixed berries",
          "Almond milk",
        ],
      },
      {
        type: "Lunch",
        name: "Mediterranean Chickpea Salad",
        calories: 410,
        carbs: "52g",
        protein: "15g",
        fat: "14g",
        ingredients: [
          "Chickpeas",
          "Cucumber",
          "Cherry tomatoes",
          "Feta",
          "Olive oil",
        ],
      },
      {
        type: "Dinner",
        name: "Grilled Lemon Herb Chicken",
        calories: 450,
        carbs: "12g",
        protein: "42g",
        fat: "11g",
        ingredients: ["Chicken breast", "Asparagus", "Quinoa", "Lemon juice"],
      },
    ],
    vegetarian: [
      {
        type: "Breakfast",
        name: "Avocado & Egg Whites Toast",
        calories: 290,
        carbs: "28g",
        protein: "18g",
        fat: "10g",
        ingredients: ["Sourdough", "Egg whites", "Avocado", "Microgreens"],
      },
      {
        type: "Lunch",
        name: "Lentil & Vegetable Soup",
        calories: 350,
        carbs: "48g",
        protein: "18g",
        fat: "5g",
        ingredients: ["Brown lentils", "Carrots", "Spinach", "Vegetable broth"],
      },
      {
        type: "Dinner",
        name: "Tofu & Broccoli Stir-Fry",
        calories: 390,
        carbs: "35g",
        protein: "22g",
        fat: "12g",
        ingredients: [
          "Firm tofu",
          "Broccoli",
          "Brown rice",
          "Low-sodium tamari",
        ],
      },
    ],
    vegan: [
      {
        type: "Breakfast",
        name: "Chia Seed Pudding with Mango",
        calories: 280,
        carbs: "38g",
        protein: "8g",
        fat: "9g",
        ingredients: [
          "Chia seeds",
          "Coconut milk",
          "Fresh mango",
          "Maple syrup",
        ],
      },
      {
        type: "Lunch",
        name: "Quinoa & Black Bean Bowl",
        calories: 420,
        carbs: "55g",
        protein: "16g",
        fat: "10g",
        ingredients: [
          "Quinoa",
          "Black beans",
          "Corn",
          "Cilantro-lime dressing",
        ],
      },
      {
        type: "Dinner",
        name: "Tempeh Cauliflower Rice Mash",
        calories: 380,
        carbs: "22g",
        protein: "25g",
        fat: "14g",
        ingredients: ["Marinated tempeh", "Cauliflower rice", "Garlic spinach"],
      },
    ],
  },
  build_muscle: {
    any: [
      {
        type: "Breakfast",
        name: "Powerhouse Omelet & Toast",
        calories: 550,
        carbs: "35g",
        protein: "38g",
        fat: "18g",
        ingredients: [
          "3 Whole eggs",
          "Spinach",
          "Turkey bacon",
          "Whole wheat toast",
        ],
      },
      {
        type: "Lunch",
        name: "Beef & Rice Monster Bowl",
        calories: 680,
        carbs: "65g",
        protein: "45g",
        fat: "16g",
        ingredients: [
          "Lean ground beef",
          "Jasmine rice",
          "Zucchini",
          "Avocado oil",
        ],
      },
      {
        type: "Dinner",
        name: "Pan-Seared Salmon & Sweet Potato",
        calories: 620,
        carbs: "48g",
        protein: "40g",
        fat: "22g",
        ingredients: ["Salmon fillet", "Baked sweet potato", "Broccolini"],
      },
    ],
    vegetarian: [
      {
        type: "Breakfast",
        name: "Greek Yogurt Superbowl",
        calories: 480,
        carbs: "40g",
        protein: "35g",
        fat: "12g",
        ingredients: ["0% Greek yogurt", "Hemp seeds", "Granola", "Honey"],
      },
      {
        type: "Lunch",
        name: "Tempeh Power Salad",
        calories: 610,
        carbs: "50g",
        protein: "38g",
        fat: "20g",
        ingredients: [
          "Tempeh cubes",
          "Edamame",
          "Mixed greens",
          "Tahini dressing",
        ],
      },
      {
        type: "Dinner",
        name: "High-Protein Paneer Curry",
        calories: 650,
        carbs: "55g",
        protein: "32g",
        fat: "24g",
        ingredients: ["Paneer cubes", "Chickpea pasta", "Tomato gravy", "Peas"],
      },
    ],
    vegan: [
      {
        type: "Breakfast",
        name: "Peanut Butter Protein Shake",
        calories: 510,
        carbs: "45g",
        protein: "32g",
        fat: "16g",
        ingredients: [
          "Plant protein powder",
          "Banana",
          "Peanut butter",
          "Oat milk",
        ],
      },
      {
        type: "Lunch",
        name: "Loaded Chickpea & Seitan Wrap",
        calories: 630,
        carbs: "60g",
        protein: "42g",
        fat: "14g",
        ingredients: ["Seitan strips", "Hummus", "Whole wheat wrap", "Greens"],
      },
      {
        type: "Dinner",
        name: "Lentil Shepherd’s Pie",
        calories: 590,
        carbs: "70g",
        protein: "28g",
        fat: "12g",
        ingredients: [
          "Brown lentils",
          "Mashed potato topping",
          "Peas & carrots",
        ],
      },
    ],
  },
};

export default function App() {
  // State management for user selections
  const [goal, setGoal] = useState("lose_weight"); // lose_weight | build_muscle
  const [diet, setDiet] = useState("any"); // any | vegetarian | vegan
  const [allergies, setAllergies] = useState([]); // Array of strings
  const [generatedPlan, setGeneratedPlan] = useState(null);

  const allergyOptions = ["Gluten", "Dairy", "Nuts", "Soy"];

  const toggleAllergy = (allergy) => {
    if (allergies.includes(allergy)) {
      setAllergies(allergies.filter((a) => a !== allergy));
    } else {
      setAllergies([...allergies, allergy]);
    }
  };

  const generateDietPlan = () => {
    // Fetch base meals according to goals and diet types
    const baseMeals = MEAL_DATABASE[goal]?.[diet] || MEAL_DATABASE[goal]["any"];

    // Filter out ingredients based on selected allergies
    const filteredMeals = baseMeals.map((meal) => {
      const hasAllergy = meal.ingredients.some((ing) =>
        allergies.some((allergy) =>
          ing.toLowerCase().includes(allergy.toLowerCase())
        )
      );

      if (hasAllergy) {
        // Aesthetic swap out or modification note for allergy safety
        return {
          ...meal,
          name: `${meal.name} (Modified)`,
          ingredients: meal.ingredients.map((ing) =>
            allergies.some((allergy) =>
              ing.toLowerCase().includes(allergy.toLowerCase())
            )
              ? `${ing} ⚠️ (Swap with ${getSafeAlternative(allergy)})`
              : ing
          ),
        };
      }
      return meal;
    });

    setGeneratedPlan(filteredMeals);
  };

  const getSafeAlternative = (allergy) => {
    switch (allergy.toLowerCase()) {
      case "dairy":
        return "Plant-based alternative";
      case "gluten":
        return "Gluten-free alternative";
      case "nuts":
        return "Seeds or Sunflower butter";
      case "soy":
        return "Coconut aminos / Chickpea alternative";
      default:
        return "Safe alternative";
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F4] text-[#302820] font-sans antialiased selection:bg-[#DEC9B5]">
      {/* Header Banner */}
      <header className="border-b border-[#E0D9CE] bg-white/60 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#6B8B5E] flex items-center justify-center text-white shadow-sm">
              <Utensils size={18} />
            </div>
            <span className="font-serif text-xl font-bold tracking-tight text-[#302820]">
              Nourish<span className="text-[#6B8B5E]">Plan</span>
            </span>
          </div>
          <p className="text-xs tracking-wider uppercase font-medium text-[#302820]/60 hidden sm:block">
            Your Conscious Kitchen Companion
          </p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-12">
        {/* Intro */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight mb-3">
            Tailor Your Daily Nourishment
          </h1>
          <p className="text-[#302820]/70 text-sm sm:text-base">
            Select your path, dietary ethics, and restrictions to unveil a
            beautifully balanced meal matrix mapped exactly to your lifestyle
            goals.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Preferences Control Panel */}
          <section className="lg:col-span-1 bg-white p-6 rounded-2xl border border-[#E0D9CE] shadow-sm space-y-6">
            <div className="flex items-center gap-2 pb-3 border-b border-[#EDE8E0]">
              <Sparkles size={18} className="text-[#6B8B5E]" />
              <h2 className="font-serif text-lg font-bold">Preferences</h2>
            </div>

            {/* Goal Selector */}
            <div className="space-y-2.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[#302820]/60 flex items-center gap-1.5">
                <Flame size={14} /> Health Goal
              </label>
              <div className="grid grid-cols-1 gap-2">
                <button
                  onClick={() => setGoal("lose_weight")}
                  className={`w-full text-left px-4 py-3 rounded-xl border transition-all text-sm flex flex-col ${
                    goal === "lose_weight"
                      ? "bg-[#6B8B5E] border-[#6B8B5E] text-white shadow-sm"
                      : "bg-[#FAF8F4] border-[#E0D9CE] hover:bg-[#EDE8E0]"
                  }`}
                >
                  <span className="font-semibold">Weight Management</span>
                  <span
                    className={`text-xs mt-0.5 ${
                      goal === "lose_weight"
                        ? "text-white/80"
                        : "text-[#302820]/60"
                    }`}
                  >
                    Caloric deficit & nutrient dense
                  </span>
                </button>
                <button
                  onClick={() => setGoal("build_muscle")}
                  className={`w-full text-left px-4 py-3 rounded-xl border transition-all text-sm flex flex-col ${
                    goal === "build_muscle"
                      ? "bg-[#6B8B5E] border-[#6B8B5E] text-white shadow-sm"
                      : "bg-[#FAF8F4] border-[#E0D9CE] hover:bg-[#EDE8E0]"
                  }`}
                >
                  <span className="font-semibold">Muscle Architecture</span>
                  <span
                    className={`text-xs mt-0.5 ${
                      goal === "build_muscle"
                        ? "text-white/80"
                        : "text-[#302820]/60"
                    }`}
                  >
                    Surplus protein & power macros
                  </span>
                </button>
              </div>
            </div>

            {/* Diet Type Selector */}
            <div className="space-y-2.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[#302820]/60 flex items-center gap-1.5">
                <Leaf size={14} /> Dietary Preference
              </label>
              <div className="grid grid-cols-3 gap-1.5 bg-[#EDE8E0] p-1 rounded-xl">
                {["any", "vegetarian", "vegan"].map((t) => (
                  <button
                    key={t}
                    onClick={() => setDiet(t)}
                    className={`capitalize py-2 text-xs font-medium rounded-lg transition-all ${
                      diet === t
                        ? "bg-white text-[#302820] shadow-sm font-semibold"
                        : "text-[#302820]/70 hover:text-[#302820]"
                    }`}
                  >
                    {t === "any" ? "Standard" : t}
                  </button>
                ))}
              </div>
            </div>

            {/* Allergies / Exclusions */}
            <div className="space-y-2.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[#302820]/60 flex items-center gap-1.5">
                <ShieldAlert size={14} /> Allergies & Exclusions
              </label>
              <div className="flex flex-wrap gap-2">
                {allergyOptions.map((allergy) => {
                  const isSelected = allergies.includes(allergy);
                  return (
                    <button
                      key={allergy}
                      onClick={() => toggleAllergy(allergy)}
                      className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${
                        isSelected
                          ? "bg-[#DEC9B5] border-[#DEC9B5] font-semibold"
                          : "bg-white border-[#E0D9CE] text-[#302820]/80 hover:bg-[#FAF8F4]"
                      }`}
                    >
                      {allergy}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Action Button */}
            <button
              onClick={generateDietPlan}
              className="w-full mt-2 bg-[#6B8B5E] hover:bg-[#5a774f] text-white font-medium py-3 px-4 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 group text-sm"
            >
              <RefreshCw
                size={16}
                className="group-hover:rotate-45 transition-transform"
              />
              Generate Blueprint
            </button>
          </section>

          {/* Results Area */}
          <section className="lg:col-span-2 space-y-6">
            {generatedPlan ? (
              <div className="space-y-4 animate-fade-in">
                <div className="flex items-center justify-between pb-2 border-b border-[#E0D9CE]">
                  <h3 className="font-serif text-xl font-bold">
                    Your Curated Day Plan
                  </h3>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-[#EAE3D8] font-medium text-[#302820]/80">
                    {goal === "lose_weight"
                      ? "Target: Lean & Trim"
                      : "Target: Growth & Strength"}
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {generatedPlan.map((meal, index) => (
                    <div
                      key={index}
                      className="bg-white border border-[#E0D9CE] rounded-2xl p-5 hover:shadow-md transition-shadow flex flex-col md:flex-row gap-5"
                    >
                      {/* Left: Meal Category Badge */}
                      <div className="md:w-32 flex-shrink-0">
                        <span className="inline-block text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 bg-[#EDE8E0] rounded-md text-[#302820]/70 mb-1">
                          {meal.type}
                        </span>
                        <h4 className="font-serif font-bold text-base leading-snug mt-1 text-[#302820]">
                          {meal.name}
                        </h4>
                      </div>

                      {/* Middle: Ingredients */}
                      <div className="flex-1 space-y-1.5 border-t md:border-t-0 md:border-l border-[#EDE8E0] pt-3 md:pt-0 md:pl-5">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#302820]/40 flex items-center gap-1">
                          <Apple size={12} /> Composition
                        </span>
                        <ul className="grid grid-cols-2 gap-x-3 gap-y-1 text-xs text-[#302820]/80">
                          {meal.ingredients.map((ing, i) => (
                            <li key={i} className="flex items-start gap-1">
                              <span className="text-[#6B8B5E] mt-0.5">•</span>
                              <span>{ing}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Right: Macro Tracker */}
                      <div className="bg-[#FAF8F4] border border-[#E0D9CE] rounded-xl p-3 flex md:flex-col justify-between md:justify-center items-center md:items-stretch gap-2 min-w-[120px]">
                        <div className="text-center md:border-b border-[#E0D9CE]/60 md:pb-1.5">
                          <span className="block text-[10px] uppercase tracking-wider text-[#302820]/50">
                            Energy
                          </span>
                          <span className="text-sm font-bold text-[#6B8B5E]">
                            {meal.calories} kcal
                          </span>
                        </div>
                        <div className="flex md:justify-around gap-3 md:gap-0 text-[10px] w-full text-center text-[#302820]/70 pt-0.5">
                          <div>
                            <span className="block font-medium">P</span>
                            <span className="font-bold">{meal.protein}</span>
                          </div>
                          <div>
                            <span className="block font-medium">C</span>
                            <span className="font-bold">{meal.carbs}</span>
                          </div>
                          <div>
                            <span className="block font-medium">F</span>
                            <span className="font-bold">{meal.fat}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              /* Empty State Placeholder */
              <div className="bg-white border-2 border-dashed border-[#E0D9CE] rounded-2xl p-12 text-center space-y-4 flex flex-col items-center justify-center min-h-[380px]">
                <div className="w-12 h-12 rounded-full bg-[#EAE3D8] flex items-center justify-center text-[#302820]/60">
                  <Utensils size={22} />
                </div>
                <div className="max-w-xs space-y-1">
                  <h3 className="font-serif font-bold text-lg">
                    No Blueprint Active
                  </h3>
                  <p className="text-xs text-[#302820]/60">
                    Configure your health targets on the left matrix and
                    generate a specialized culinary map.
                  </p>
                </div>
              </div>
            )}
          </section>
        </div>
      </main>

      {/* Footer minimal signature */}
      <footer className="mt-24 border-t border-[#E0D9CE] py-6 text-center text-xs text-[#302820]/40">
        © 2026 NourishPlan. Curated carefully for wellness.
      </footer>
    </div>
  );
}
