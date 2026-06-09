import React, { useMemo, useState } from "react";
import { ArrowLeft, Bot, Dumbbell, Flame, HeartPulse, Layers3, MoveRight, Sparkles, Target, Zap } from "lucide-react";

const muscleGroups = [
  {
    key: "chest",
    name: "Груди",
    icon: Dumbbell,
    accent: "from-rose-500 to-orange-400",
    description: "Силові вправи на верх, середину та нижню частину грудних м'язів.",
    exercises: [
      {
        name: "Жим штанги лежачи",
        image: "/assets/gifs/chest/bench-press.jpg",
        muscles: [{ name: "Груди", pct: 45 }, { name: "Трицепс", pct: 30 }, { name: "Передні дельти", pct: 25 }],
        description: "Базова силова вправа для збільшення маси та сили грудних м'язів.",
        steps: [
          "Ляж на лаву, стопи впевнено на підлозі.",
          "Візьми штангу трохи ширше плечей.",
          "Опусти штангу до середини грудей під контролем.",
          "Вичави штангу вгору без ривка, тримаючи лопатки зведеними."
        ]
      },
      {
        name: "Жим гантелей на лаві",
        image: "/assets/gifs/chest/dumbbell-press.jpg",
        muscles: [{ name: "Груди", pct: 50 }, { name: "Трицепс", pct: 25 }, { name: "Плечі", pct: 25 }],
        description: "Дозволяє краще розтягнути груди та вирівняти силу рук.",
        steps: [
          "Ляж на лаву й зафіксуй лопатки.",
          "Опусти гантелі до рівня грудей.",
          "Піднімай їх по дузі вгору.",
          "Не зводь плечі до вух і не прогинай надмірно спину."
        ]
      },
      {
        name: "Віджимання на брусах",
        image: "/assets/gifs/chest/dips.jpg",
        muscles: [{ name: "Груди", pct: 40 }, { name: "Трицепс", pct: 40 }, { name: "Плечі", pct: 20 }],
        description: "Потужна вправа з власною вагою для грудей і трицепса.",
        steps: [
          "Займи вихідне положення на брусах.",
          "Нахили корпус трохи вперед.",
          "Опустися до комфортної глибини.",
          "Підіймайся вгору без розгойдування корпусу."
        ]
      },
      {
        name: "Кросовер у блоці",
        image: "/assets/gifs/chest/cable-fly.jpg",
        muscles: [{ name: "Груди", pct: 60 }, { name: "Передні дельти", pct: 20 }, { name: "Стабілізатори", pct: 20 }],
        description: "Ізоляція грудей з хорошим відчуттям м'яза.",
        steps: [
          "Стань між двома блоками.",
          "Злегка зігни руки в ліктях.",
          "Зведи руки перед собою на рівні грудей.",
          "Повернись у вихідну позицію повільно."
        ]
      },
      {
        name: "Жим у тренажері",
        image: "/assets/gifs/chest/machine-press.jpg",
        muscles: [{ name: "Груди", pct: 55 }, { name: "Трицепс", pct: 25 }, { name: "Плечі", pct: 20 }],
        description: "Безпечний варіант для новачків і контролю траєкторії.",
        steps: [
          "Відрегулюй сидіння під висоту плечей.",
          "Притисни спину до спинки тренажера.",
          "Видавлюй ручки вперед без ривка.",
          "Контролюй негативну фазу."
        ]
      }
    ]
  },
  {
    key: "back",
    name: "Спина",
    icon: Layers3,
    accent: "from-cyan-500 to-blue-500",
    description: "Вправи на ширину, товщину та стабілізацію спини.",
    exercises: [
      {
        name: "Підтягування",
        image: "/assets/gifs/back/pull-ups.jpg",
        muscles: [{ name: "Широчайші", pct: 50 }, { name: "Біцепс", pct: 25 }, { name: "Передпліччя", pct: 25 }],
        description: "Одна з найкращих вправ для ширини спини.",
        steps: [
          "Візьми турнік хватом трохи ширше плечей.",
          "Підтягуй груди до перекладини.",
          "Не розгойдуйся і не кидай тіло.",
          "Опускайся повільно до повного контролю."
        ]
      },
      {
        name: "Тяга штанги в нахилі",
        image: "/assets/gifs/back/barbell-row.jpg",
        muscles: [{ name: "Спина", pct: 55 }, { name: "Задні дельти", pct: 20 }, { name: "Біцепс", pct: 25 }],
        description: "Добре розвиває товщину середини спини.",
        steps: [
          "Нахили корпус із прямою спиною.",
          "Потягни штангу до нижньої частини живота.",
          "Лікті веди назад, а не в сторони.",
          "Не округлюй поперек."
        ]
      },
      {
        name: "Тяга верхнього блока",
        image: "/assets/gifs/back/lat-pulldown.jpg",
        muscles: [{ name: "Широчайші", pct: 55 }, { name: "Біцепс", pct: 25 }, { name: "Ромбоїди", pct: 20 }],
        description: "Контрольований варіант для розвитку широчайших.",
        steps: [
          "Сядь рівно і зафіксуй ноги.",
          "Тягни рукоять до верхньої частини грудей.",
          "Лікті опускай вниз і назад.",
          "Поверни вагу під контролем."
        ]
      },
      {
        name: "Гіперекстензія",
        image: "/assets/gifs/back/hyperextension.jpg",
        muscles: [{ name: "Поперек", pct: 50 }, { name: "Сідниці", pct: 30 }, { name: "Задня поверхня стегна", pct: 20 }],
        description: "Підсилює нижню частину спини й стабілізацію корпусу.",
        steps: [
          "Зафіксуй ноги в тренажері.",
          "Опускай корпус до контрольованого нахилу.",
          "Підіймайся до прямої лінії тіла.",
          "Не перегинай спину вгорі."
        ]
      },
      {
        name: "Тяга гантелі однією рукою",
        image: "/assets/gifs/back/one-arm-row.jpg",
        muscles: [{ name: "Широчайші", pct: 50 }, { name: "Біцепс", pct: 25 }, { name: "Середня спина", pct: 25 }],
        description: "Допомагає вирівняти дисбаланс між сторонами спини.",
        steps: [
          "Упрись однією рукою в лаву.",
          "Тягни гантель до таза.",
          "Пауза вгорі для скорочення.",
          "Опускай повільно без ривка."
        ]
      }
    ]
  },
  {
    key: "legs",
    name: "Ноги",
    icon: Target,
    accent: "from-emerald-500 to-lime-400",
    description: "Квадрицепси, біцепс стегна, сідниці та литки.",
    exercises: [
      {
        name: "Присідання зі штангою",
        image: "/assets/gifs/legs/squat.jpg",
        muscles: [{ name: "Квадрицепс", pct: 40 }, { name: "Сідниці", pct: 35 }, { name: "Кор", pct: 25 }],
        description: "Базова вправа для сили, маси і загальної атлетичності ніг.",
        steps: [
          "Постав стопи на ширину плечей.",
          "Тримай спину нейтральною.",
          "Сідай вниз до комфортної глибини.",
          "Підіймайся через п'яти, без завалу колін."
        ]
      },
      {
        name: "Жим ногами",
        image: "/assets/gifs/legs/leg-press.jpg",
        muscles: [{ name: "Квадрицепс", pct: 50 }, { name: "Сідниці", pct: 30 }, { name: "Задня поверхня стегна", pct: 20 }],
        description: "Добрий варіант для об'єму без великого навантаження на спину.",
        steps: [
          "Постав стопи стабільно на платформу.",
          "Опусти платформу повільно вниз.",
          "Не відривай поперек від сидіння.",
          "Видавлюй платформу, не блокуючи коліна жорстко."
        ]
      },
      {
        name: "Румунська тяга",
        image: "/assets/gifs/legs/romanian-deadlift.jpg",
        muscles: [{ name: "Задня поверхня стегна", pct: 45 }, { name: "Сідниці", pct: 35 }, { name: "Поперек", pct: 20 }],
        description: "Одна з найкращих вправ для задньої ланки.",
        steps: [
          "Тримай штангу близько до ніг.",
          "Відводь таз назад, зберігаючи спину рівною.",
          "Відчувай натяг у задній поверхні стегна.",
          "Повернись у вихідне положення за рахунок сідниць."
        ]
      },
      {
        name: "Випади",
        image: "/assets/gifs/legs/lunges.jpg",
        muscles: [{ name: "Квадрицепс", pct: 40 }, { name: "Сідниці", pct: 40 }, { name: "Стабілізатори", pct: 20 }],
        description: "Розвивають баланс, силу та симетрію ніг.",
        steps: [
          "Зроби довгий крок вперед.",
          "Опускайся, поки обидва коліна не будуть під контролем.",
          "Коліно передньої ноги не завалюй всередину.",
          "Повернись у старт за рахунок робочої ноги."
        ]
      },
      {
        name: "Згинання ніг у тренажері",
        image: "/assets/gifs/legs/leg-curl.jpg",
        muscles: [{ name: "Біцепс стегна", pct: 70 }, { name: "Ікри", pct: 10 }, { name: "Сідниці", pct: 20 }],
        description: "Ізоляція задньої поверхні стегна.",
        steps: [
          "Ляж або сядь у тренажер.",
          "Підтягуй п'яти до сідниць.",
          "Пауза у верхній точці.",
          "Опускай повільно."
        ]
      }
    ]
  },
  {
    key: "arms",
    name: "Руки",
    icon: Flame,
    accent: "from-violet-500 to-fuchsia-500",
    description: "Біцепс, трицепс і передпліччя.",
    exercises: [
      {
        name: "Підйом штанги на біцепс",
        image: "/assets/gifs/arms/barbell-curl.jpg",
        muscles: [{ name: "Біцепс", pct: 70 }, { name: "Передпліччя", pct: 20 }, { name: "Плечі", pct: 10 }],
        description: "Класична масонабірна вправа для біцепса.",
        steps: [
          "Тримай корпус рівно.",
          "Піднімай штангу без розгойдування.",
          "Лікті притиснуті до корпусу.",
          "Опускай вагу повільно."
        ]
      },
      {
        name: "Молотки з гантелями",
        image: "/assets/gifs/arms/hammer-curls.jpg",
        muscles: [{ name: "Біцепс", pct: 45 }, { name: "Плечопроменевий", pct: 35 }, { name: "Передпліччя", pct: 20 }],
        description: "Підсилює об'єм руки та силу хвата.",
        steps: [
          "Тримай гантелі нейтральним хватом.",
          "Піднімай без руху плечима.",
          "Не завалюй зап'ястя назад.",
          "Повільно опускай вниз."
        ]
      },
      {
        name: "Французький жим",
        image: "/assets/gifs/arms/skull-crusher.jpg",
        muscles: [{ name: "Трицепс", pct: 75 }, { name: "Передні дельти", pct: 15 }, { name: "Передпліччя", pct: 10 }],
        description: "Сильна ізоляція трицепса.",
        steps: [
          "Ляж на лаву і візьми EZ-штангу.",
          "Згинай руки тільки в ліктях.",
          "Опускай штангу за голову або до лоба під контролем.",
          "Повернися вгору без ривка."
        ]
      },
      {
        name: "Розгинання рук на блоці",
        image: "/assets/gifs/arms/triceps-pushdown.jpg",
        muscles: [{ name: "Трицепс", pct: 80 }, { name: "Передпліччя", pct: 20 }],
        description: "Надійна базова вправа для трицепса.",
        steps: [
          "Приклади лікті до корпусу.",
          "Розгинай руки до кінця внизу.",
          "Не вмикай корпус у роботу.",
          "Піднімай ручку повільно назад."
        ]
      },
      {
        name: "Концентрований підйом",
        image: "/assets/gifs/arms/concentration-curl.jpg",
        muscles: [{ name: "Біцепс", pct: 85 }, { name: "Передпліччя", pct: 15 }],
        description: "Максимальна ізоляція біцепса та контроль руху.",
        steps: [
          "Сядь і зафіксуй лікоть на внутрішній стороні стегна.",
          "Підіймай гантель без поштовху.",
          "Пікова пауза вгорі.",
          "Плавно опусти вниз."
        ]
      }
    ]
  },
  {
    key: "abs",
    name: "Прес",
    icon: HeartPulse,
    accent: "from-amber-400 to-yellow-500",
    description: "Прямий та косий прес, стабілізація корпусу.",
    exercises: [
      {
        name: "Скручування",
        image: "/assets/gifs/abs/crunch.jpg",
        muscles: [{ name: "Прямий прес", pct: 80 }, { name: "Косі", pct: 20 }],
        description: "Базова вправа для верхньої частини преса.",
        steps: [
          "Ляж на килимок і зігни коліна.",
          "Піднімай плечі, а не весь корпус.",
          "Не тягни шию руками.",
          "Опускайся повільно."
        ]
      },
      {
        name: "Планка",
        image: "/assets/gifs/abs/plank.jpg",
        muscles: [{ name: "Кор", pct: 50 }, { name: "Прес", pct: 30 }, { name: "Сідниці", pct: 20 }],
        description: "Стабілізує корпус і зміцнює глибокі м'язи.",
        steps: [
          "Стань на лікті та носки.",
          "Тримай тіло прямою лінією.",
          "Не провалюй поперек.",
          "Дихай рівно."
        ]
      },
      {
        name: "Підйом ніг у висі",
        image: "/assets/gifs/abs/hanging-leg-raise.jpg",
        muscles: [{ name: "Нижній прес", pct: 60 }, { name: "Косі", pct: 20 }, { name: "Згиначі стегна", pct: 20 }],
        description: "Сильна вправа для нижньої частини живота.",
        steps: [
          "Повисни на турніку.",
          "Підіймай ноги без розгойдування.",
          "Контролюй опускання.",
          "Не закидай тіло назад."
        ]
      },
      {
        name: "Велосипед",
        image: "/assets/gifs/abs/bicycle-crunch1.jpg",
        muscles: [{ name: "Косі", pct: 45 }, { name: "Прес", pct: 55 }],
        description: "Підходить для рельєфу та активної роботи косих м'язів.",
        steps: [
          "Ляж на спину і підніми ноги.",
          "Чергуй торкання ліктем до коліна.",
          "Рухайся повільно, а не швидко.",
          "Тримай поперек притиснутим."
        ]
      },
      {
        name: "Рол-аут",
        image: "/assets/gifs/abs/ab-rollout.jpg",
        muscles: [{ name: "Кор", pct: 45 }, { name: "Прес", pct: 35 }, { name: "Спина", pct: 20 }],
        description: "Складна, але дуже ефективна вправа на стабілізацію.",
        steps: [
          "Стань на коліна з роликом.",
          "Відкочуйся вперед під контролем.",
          "Не допускай провисання попереку.",
          "Повернись назад силою преса."
        ]
      }
    ]
  }
];

const assistantResponses = [
  "Можу підібрати вправи під твою ціль: маса, рельєф або сила.",
  "Для початку краще обрати 1-2 базові вправи на групу м'язів.",
  "Якщо хочеш, я можу сформувати програму на 3 дні, 4 дні або 5 днів на тиждень.",
  "Порада: починай з техніки, а не з великої ваги."
];

function App() {
  const [groupKey, setGroupKey] = useState(null);
  const [exerciseName, setExerciseName] = useState(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [messages, setMessages] = useState([
    { from: "assistant", text: "Привіт! Я AI-помічник Gym guide. Обери м'язову групу або запитай, що краще підійде для твоєї цілі." }
  ]);

  const currentGroup = useMemo(
    () => muscleGroups.find((g) => g.key === groupKey) || null,
    [groupKey]
  );
  const currentExercise = useMemo(
    () => currentGroup?.exercises.find((ex) => ex.name === exerciseName) || null,
    [currentGroup, exerciseName]
  );

  const backLabel = currentExercise ? "Назад до вправ" : currentGroup ? "Назад до груп" : null;

  const submitChat = async () => {
    const text = chatInput.trim();
    if (!text || chatLoading) return;
    setChatLoading(true);
    setMessages((prev) => [...prev, { from: "user", text }]);
    setChatInput("");

    try {
      const context = currentExercise
        ? `Поточна вправa: ${currentExercise.name}. Група: ${currentGroup?.name}.`
        : currentGroup
          ? `Користувач зараз у розділі: ${currentGroup.name}.`
          : "Користувач на головній сторінці сайту Gym guide.";

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          context,
          history: messages.slice(-8)
        })
      });

      if (!response.ok) throw new Error("Bad response");
      const data = await response.json();
      setMessages((prev) => [...prev, { from: "assistant", text: data.reply || "Не вдалося отримати відповідь." }]);
    } catch {
      const fallback = assistantResponses[messages.length % assistantResponses.length];
      setMessages((prev) => [...prev, { from: "assistant", text: fallback }]);
    } finally {
      setChatLoading(false);
    }
  };

  const renderHome = () => (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
      {muscleGroups.map((group) => {
        const Icon = group.icon;
        return (
          <button
            key={group.key}
            onClick={() => setGroupKey(group.key)}
            className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-4 text-left shadow-[0_18px_50px_rgba(0,0,0,0.35)] transition hover:-translate-y-1 hover:bg-white/10"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${group.accent} opacity-15`} />
            <div className="relative flex h-full flex-col justify-between gap-4">
              <div className="flex items-center justify-between">
                <div className="rounded-2xl bg-white/10 p-3 backdrop-blur">
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <MoveRight className="h-5 w-5 text-white/50 transition group-hover:translate-x-1 group-hover:text-white" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-white">{group.name}</h2>
                <p className="mt-1 text-xs leading-5 text-white/65">{group.description}</p>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );

  const renderGroup = () => (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {currentGroup?.exercises.map((exercise) => (
        <button
          key={exercise.name}
          onClick={() => setExerciseName(exercise.name)}
          className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 text-left shadow-[0_18px_50px_rgba(0,0,0,0.35)] transition hover:-translate-y-1 hover:bg-white/10"
        >
          <div className="aspect-[16/10] overflow-hidden bg-black/30">
            <img src={exercise.image} alt={exercise.name} className="h-full w-full object-cover" />
          </div>
          <div className="space-y-2 p-4">
            <h3 className="text-base font-semibold text-white">{exercise.name}</h3>
            <p className="text-sm text-white/65 line-clamp-2">{exercise.description}</p>
          </div>
        </button>
      ))}
    </div>
  );

  const renderExercise = () => (
    <div className="space-y-5">
      <div className="overflow-hidden rounded-[28px] border border-white/10 bg-white/5 shadow-[0_18px_50px_rgba(0,0,0,0.35)]">
        <div className="aspect-[16/11] bg-black/30">
          <img src={currentExercise?.image} alt={currentExercise?.name} className="h-full w-full object-cover" />
        </div>
        <div className="p-5 sm:p-6">
          <div className="flex flex-wrap items-center gap-2 text-xs text-white/70">
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">GIF / Прев'ю</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Техніка виконання</span>
          </div>
          <h3 className="mt-4 text-2xl font-bold text-white">{currentExercise?.name}</h3>
          <p className="mt-2 text-sm leading-6 text-white/70">{currentExercise?.description}</p>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[28px] border border-white/10 bg-white/5 p-5 shadow-[0_18px_50px_rgba(0,0,0,0.35)]">
          <div className="mb-4 flex items-center gap-2 text-white">
            <Sparkles className="h-4 w-4 text-cyan-400" />
            <h4 className="font-semibold">Покрокова техніка</h4>
          </div>
          <ol className="space-y-3">
            {currentExercise?.steps.map((step, index) => (
              <li key={index} className="flex gap-3 rounded-2xl border border-white/10 bg-black/20 p-3 text-sm leading-6 text-white/80">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-cyan-400/15 text-xs font-bold text-cyan-300">
                  {index + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="rounded-[28px] border border-white/10 bg-white/5 p-5 shadow-[0_18px_50px_rgba(0,0,0,0.35)]">
          <div className="mb-4 flex items-center gap-2 text-white">
            <Zap className="h-4 w-4 text-amber-300" />
            <h4 className="font-semibold">М'язове навантаження</h4>
          </div>
          <div className="space-y-3">
            {currentExercise?.muscles.map((m) => (
              <div key={m.name}>
                <div className="mb-1 flex justify-between text-sm text-white/80">
                  <span>{m.name}</span>
                  <span>{m.pct}%</span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-violet-500" style={{ width: `${m.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm leading-6 text-white/70">
            Тут можна пізніше підставити реальну картинку-анатомію або інтерактивну SVG-схему м'язів.
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#050816] text-white">
      <div className="mx-auto min-h-screen max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
        <header className="sticky top-0 z-30 mb-5 rounded-[28px] border border-white/10 bg-[#050816]/85 px-4 py-4 backdrop-blur-xl sm:px-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-cyan-300/80">
                <Sparkles className="h-4 w-4" />
                Gym guide
              </div>
              <h1 className="mt-1 text-xl font-bold sm:text-2xl">Сучасний тренувальний сайт</h1>
            </div>
            <button
              onClick={() => setChatOpen(true)}
              className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-200 transition hover:bg-cyan-400/20"
            >
              <Bot className="h-4 w-4" />
              AI
            </button>
          </div>
        </header>

        <main className="pb-28">
          <div className="mb-5 flex items-center justify-between gap-3">
            <div>
              <p className="text-sm text-white/55">Темна тема</p>
              <p className="mt-1 text-xs text-white/40">
                {currentExercise ? "Сторінка вправи" : currentGroup ? `Група м'язів: ${currentGroup.name}` : "Головна сторінка"}
              </p>
            </div>
            {backLabel ? (
              <button
                onClick={() => {
                  if (currentExercise) setExerciseName(null);
                  else if (currentGroup) setGroupKey(null);
                }}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/85 transition hover:bg-white/10"
              >
                <ArrowLeft className="h-4 w-4" />
                {backLabel}
              </button>
            ) : null}
          </div>

          {currentExercise ? renderExercise() : currentGroup ? renderGroup() : renderHome()}
        </main>

        <button
          onClick={() => setChatOpen(true)}
          className="fixed bottom-5 right-5 z-40 flex h-16 w-16 items-center justify-center rounded-full border border-cyan-400/30 bg-gradient-to-br from-cyan-400 to-violet-500 shadow-[0_18px_60px_rgba(34,211,238,0.35)] transition hover:scale-105"
          aria-label="Відкрити AI чат"
        >
          <Bot className="h-8 w-8 text-white" />
        </button>

        {chatOpen && (
          <div className="fixed inset-0 z-50 bg-black/70 p-3 backdrop-blur-sm sm:p-5">
            <div className="mx-auto flex h-full max-w-2xl flex-col overflow-hidden rounded-[30px] border border-white/10 bg-[#07111f] shadow-[0_18px_80px_rgba(0,0,0,0.55)]">
              <div className="flex items-center justify-between border-b border-white/10 p-4 sm:p-5">
                <div>
                  <h2 className="text-lg font-semibold text-white">AI помічник</h2>
                </div>
                <button
                  onClick={() => setChatOpen(false)}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 transition hover:bg-white/10"
                >
                  Закрити
                </button>
              </div>

              <div className="flex-1 space-y-3 overflow-y-auto p-4 sm:p-5">
                {messages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-6 ${msg.from === "user" ? "bg-cyan-400 text-slate-950" : "bg-white/8 border border-white/10 text-white"}`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
                {chatLoading ? <div className="text-sm text-white/45">AI думає...</div> : null}
              </div>

              <div className="border-t border-white/10 p-4 sm:p-5">
                <div className="flex gap-2">
                  <input
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && submitChat()}
                    placeholder="Наприклад: підбери вправи на груди для новачка"
                    className="min-w-0 flex-1 rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none placeholder:text-white/30 focus:border-cyan-400/50"
                  />
                  <button
                    onClick={submitChat}
                    className="rounded-2xl bg-white px-4 py-3 text-sm font-medium text-slate-950 transition hover:bg-cyan-300"
                  >
                    Надіслати
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
