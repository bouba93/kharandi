import React, { useState, useEffect, useRef } from 'react';
import {
  ChevronLeft, Clock, Moon, Sun, ZoomIn, ZoomOut, CheckCircle, FileText, BookOpen, Menu, X, Search, Bookmark, Share2, Award, Globe, ArrowRight, RotateCcw, HelpCircle, AlertTriangle, Trophy, ArrowLeft, Video
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { saveReadingProgress, getReadingProgress } from '../../services/content';

interface CourseViewerProps {
  doc: any;
  username: string;
  onClose: () => void;
}

export const CourseViewer: React.FC<CourseViewerProps> = ({ doc, username, onClose }) => {
  const [dark, setDark] = useState(false);
  const [fontSize, setFontSize] = useState(18);
  const [activeTab, setActiveTab] = useState<'slides' | 'summary' | 'quiz'>('slides');
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isRead, setIsRead] = useState(false);
  const [progress, setProgress] = useState(0);

  // Quiz state
  const [quizAnswers, setQuizAnswers] = useState<number[]>(Array(10).fill(-1));
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  useEffect(() => {
    getReadingProgress(doc.id).then(p => {
      setProgress(p?.progress || 0);
      setIsRead(p?.is_read || false);
    }).catch(() => {});
  }, [doc.id]);

  // Smart Slide Chunking: Split course content into well-balanced slides
  const slides = React.useMemo(() => {
    if (!doc?.content) return [{ title: doc.title, content: doc.description || '' }];
    
    const lines = doc.content.split('\n');
    const result: { title: string; content: string }[] = [];
    let currentTitle = doc.title;
    let currentParagraphs: string[] = [];

    const pushSlide = (title: string, paragraphs: string[]) => {
      if (paragraphs.length === 0) return;
      // If paragraphs are too many, split into sub-slides
      if (paragraphs.length > 5) {
        for (let i = 0; i < paragraphs.length; i += 4) {
          const chunk = paragraphs.slice(i, i + 4);
          result.push({
            title: i === 0 ? title : `${title} (suite)`,
            content: chunk.join('\n')
          });
        }
      } else {
        result.push({ title, content: paragraphs.join('\n') });
      }
    };

    lines.forEach((line: string) => {
      if (line.startsWith('# ') || line.startsWith('## ')) {
        if (currentParagraphs.length > 0) {
          pushSlide(currentTitle, currentParagraphs);
          currentParagraphs = [];
        }
        currentTitle = line.replace(/^[#]+\s/, '');
      } else if (line.trim().startsWith('### ')) {
        if (currentParagraphs.length > 0) {
          pushSlide(currentTitle, currentParagraphs);
          currentParagraphs = [];
        }
        currentTitle = line.replace(/^[#]+\s/, '');
      } else {
        currentParagraphs.push(line);
      }
    });

    if (currentParagraphs.length > 0) {
      pushSlide(currentTitle, currentParagraphs);
    }

    if (result.length === 0) {
      result.push({ title: doc.title, content: doc.content });
    }

    return result;
  }, [doc]);

  // Generate Summary points
  const summaryPoints = React.useMemo(() => {
    if (!doc?.content) return ["Maîtriser les notions fondamentales du cours.", "Comprendre les causes et les conséquences des événements historiques.", "Analyser les documents officiels et les dates clés."];
    const lines = doc.content.split('\n');
    const bulletPoints = lines.filter(l => l.trim().startsWith('- **') || l.trim().startsWith('* **') || l.trim().startsWith('• ') || l.trim().startsWith('- '));
    if (bulletPoints.length >= 6) {
      return bulletPoints.slice(0, 10).map(p => p.replace(/^[-*•]\s+/, '').replace(/\*\*/g, ''));
    }
    return [
      "Étude rigoureuse du contexte historique, géopolitique et institutionnel.",
      "Analyse approfondie des phases majeures, des crises et des acteurs clés du programme officiel.",
      "Maîtrise des répercussions socio-économiques et de l'évolution des relations internationales.",
      "Synthèse critique des sujets d'examen officiels et des méthodologies de dissertation."
    ];
  }, [doc]);

  // Generate 10 standard 100-point Quiz Questions based on course topic
  const quizQuestions = React.useMemo(() => {
    const titleLower = (doc.title || '').toLowerCase();
    if (titleLower.includes('histoire') || titleLower.includes('tss') || titleLower.includes('mao')) {
      return [
        {
          question: "En quelle année a éclaté la Seconde Guerre mondiale avec l'invasion de la Pologne par l'Allemagne nazie ?",
          options: ["1935", "1939", "1941", "1945"],
          correct: 1
        },
        {
          question: "Quel événement survenu le jeudi 24 octobre 1929 a déclenché la grande crise économique mondiale ?",
          options: ["Le krach boursier de Wall Street", "La révolution bolchévique", "La signature du Traité de Versailles", "La crise de Suez"],
          correct: 0
        },
        {
          question: "Quand a été officiellement proclamée la naissance de l'Organisation des Nations Unies (ONU) ?",
          options: ["1919", "1942", "24 octobre 1945", "1955"],
          correct: 2
        },
        {
          question: "Quel fut le premier Secrétaire Général de l'ONU en fonction de 1946 à 1952 ?",
          options: ["Kofi Annan", "Trygve Lie", "Dag Hammarskjöld", "António Guterres"],
          correct: 1
        },
        {
          question: "Quel pays d'Afrique noire est devenu indépendant le 6 mars 1957 sous la conduite de Kwame Nkrumah ?",
          options: ["La Guinée", "Le Sénégal", "La Gold Coast (Ghana)", "La Côte d'Ivoire"],
          correct: 2
        },
        {
          question: "Quel fut le résultat du référendum du 28 septembre 1958 en Guinée concernant la communauté franco-africaine ?",
          options: ["Un « OUI » massif", "Un « NON » massif (95% des suffrages)", "Une égalité parfaite des votes", "L'annulation totale du scrutin"],
          correct: 1
        },
        {
          question: "Qu'est-ce que l'Apartheid mis en place en Azanie (Afrique du Sud) dès 1948 ?",
          options: ["Un accord de libre-échange douanier", "La politique officielle de ségrégation et de séparation des races", "Une alliance militaire régionale", "Un traité de paix interafricain"],
          correct: 1
        },
        {
          question: "En quelle année l'OUA (Organisation de l'Unité Africaine) a-t-elle été créée à Addis-Abeba ?",
          options: ["1960", "28 mai 1963", "1999", "2002"],
          correct: 1
        },
        {
          question: "Quelle célèbre citation Paul Valéry a-t-il prononcée au lendemain de la Seconde Guerre mondiale ?",
          options: ["« Les civilisations sont immortelles »", "« Nous autres civilisations, nous savons maintenant que nous sommes mortelles »", "« L'histoire est un roman vrai »", "« Le progrès ne s'arrête jamais »"],
          correct: 1
        },
        {
          question: "Qui a formulé pour la première fois en 1955 la notion de « Tiers-Monde » ?",
          options: ["Alfred Sauvy", "Joseph Ki-Zerbo", "Albert Memmi", "Winston Churchill"],
          correct: 0
        }
      ];
    }

    // Default 10 quiz questions for any other subject
    return Array.from({ length: 10 }, (_, i) => ({
      question: `Question ${i + 1} sur les concepts clés et notions fondamentales de ${doc.title} :`,
      options: [
        "Réponse A : Principe fondamental et historique validé.",
        "Réponse B : Analyse secondaire sans fondement scientifique.",
        "Réponse C : Hypothèse non vérifiée par les faits.",
        "Réponse D : Aucune de ces propositions ne convient."
      ],
      correct: 0
    }));
  }, [doc]);

  const handleQuizSubmit = () => {
    let scoreCount = 0;
    quizQuestions.forEach((q, idx) => {
      if (quizAnswers[idx] === q.correct) {
        scoreCount += 10; // 10 questions * 10 = 100 points total
      }
    });
    setQuizScore(scoreCount);
    setQuizSubmitted(true);
    if (scoreCount >= 80) {
      setIsRead(true);
      setProgress(100);
      saveReadingProgress(doc.id, 100, true).catch(() => {});
    }
  };

  const handleRetakeQuiz = () => {
    setQuizAnswers(Array(10).fill(-1));
    setQuizSubmitted(false);
    setQuizScore(0);
    setActiveTab('slides');
    setCurrentSlideIndex(0);
  };

  const bg = dark ? 'bg-[#090d16] text-slate-100' : 'bg-[#f4f7fa] text-slate-900';
  const cardBg = dark ? 'bg-[#111827] border-slate-800/80 text-slate-100' : 'bg-white border-slate-200/90 text-slate-900';
  const subText = dark ? 'text-slate-400' : 'text-slate-600';

  return (
    <div className={`min-h-screen ${bg} flex flex-col transition-colors duration-300 font-sans`}>
      {/* Top Professional Header */}
      <header className={`sticky top-0 z-40 ${dark ? 'bg-[#090d16]/95 border-slate-800' : 'bg-white/95 border-slate-200'} backdrop-blur-xl border-b shadow-sm`}>
        <div className="h-1 bg-slate-200/50">
          <motion.div className="h-1 bg-accent"
            animate={{ width: `${activeTab === 'slides' ? ((currentSlideIndex + 1) / slides.length) * 100 : activeTab === 'summary' ? 70 : progress}%` }} transition={{ duration: 0.2 }} />
        </div>
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button onClick={onClose}
              className={`flex items-center gap-1.5 text-xs md:text-sm font-bold px-3.5 py-2 rounded-xl transition-all shadow-sm border ${dark ? 'bg-slate-800 border-slate-700 hover:bg-slate-700 text-slate-200' : 'bg-slate-100 border-slate-200 hover:bg-slate-200 text-slate-700'}`}>
              <ChevronLeft size={16} /> Retour
            </button>
            <div className="hidden sm:flex items-center gap-1 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
              <button
                onClick={() => setActiveTab('slides')}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${activeTab === 'slides' ? 'bg-accent text-slate-900 shadow-sm' : 'text-slate-600 dark:text-slate-300 hover:text-primary'}`}
              >
                🖥️ Diaporama
              </button>
              <button
                onClick={() => setActiveTab('summary')}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${activeTab === 'summary' ? 'bg-accent text-slate-900 shadow-sm' : 'text-slate-600 dark:text-slate-300 hover:text-primary'}`}
              >
                📝 Résumé Clé
              </button>
              <button
                onClick={() => setActiveTab('quiz')}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${activeTab === 'quiz' ? 'bg-accent text-slate-900 shadow-sm' : 'text-slate-600 dark:text-slate-300 hover:text-primary'}`}
              >
                🎯 Quiz
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className={`flex items-center gap-1 px-2.5 py-1 rounded-xl border ${dark ? 'bg-slate-900 border-slate-700' : 'bg-slate-100 border-slate-200'}`} title="Zoom du texte et des formules">
              <button onClick={() => setFontSize(s => Math.max(14, s - 1))} className="p-1 rounded-lg hover:bg-black/10 transition-colors" title="Zoom arrière (-)">
                <ZoomOut size={15} className={subText} />
              </button>
              <span className={`text-[11px] font-black w-10 text-center ${subText}`}>{Math.round((fontSize / 18) * 100)}%</span>
              <button onClick={() => setFontSize(s => Math.min(26, s + 1))} className="p-1 rounded-lg hover:bg-black/10 transition-colors" title="Zoom avant (+)">
                <ZoomIn size={15} className={subText} />
              </button>
            </div>

            <a
              href="https://zoom.us/start/videomeeting"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0B5CFF] hover:bg-blue-600 text-white text-xs font-bold transition-all shadow-sm"
              title="Partager ou réviser ce cours en direct sur Zoom"
            >
              <Video size={14} />
              <span>Visio Zoom</span>
            </a>

            <button onClick={() => setDark(!dark)} 
              className={`p-2.5 rounded-xl border transition-colors ${dark ? 'bg-slate-800 border-slate-700 text-yellow-400' : 'bg-slate-100 border-slate-200 text-slate-700'}`}
              title={dark ? "Mode clair" : "Mode sombre"}>
              {dark ? <Sun size={17} /> : <Moon size={17} />}
            </button>
          </div>
        </div>

        {/* Mobile Tab Bar */}
        <div className="flex sm:hidden border-t px-2 py-2 gap-1 justify-around bg-slate-50 dark:bg-slate-900">
          <button onClick={() => setActiveTab('slides')} className={`px-3 py-1.5 rounded-lg text-xs font-bold ${activeTab === 'slides' ? 'bg-accent text-slate-900' : 'text-slate-600 dark:text-slate-300'}`}>
            🖥️ Diaporama
          </button>
          <button onClick={() => setActiveTab('summary')} className={`px-3 py-1.5 rounded-lg text-xs font-bold ${activeTab === 'summary' ? 'bg-accent text-slate-900' : 'text-slate-600 dark:text-slate-300'}`}>
            📝 Résumé Clé
          </button>
          <button onClick={() => setActiveTab('quiz')} className={`px-3 py-1.5 rounded-lg text-xs font-bold ${activeTab === 'quiz' ? 'bg-accent text-slate-900' : 'text-slate-600 dark:text-slate-300'}`}>
            🎯 Quiz
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 overflow-y-auto px-4 py-8 md:py-12 max-w-4xl mx-auto w-full space-y-8">
        
        {/* TAB 1 : DIAPORAMA (SLIDESHOW) - MAGNIFICENT DESIGN & ANIMATIONS */}
        {activeTab === 'slides' && (
          <div className="space-y-6">
            {/* Top Slide Progress Bar & Controls */}
            <div className="flex items-center justify-between px-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-extrabold uppercase tracking-widest text-accent bg-accent/10 px-3.5 py-1.5 rounded-full border border-accent/25 shadow-sm">
                  Diapositive {currentSlideIndex + 1} / {slides.length}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <button
                  disabled={currentSlideIndex === 0}
                  onClick={() => setCurrentSlideIndex(s => Math.max(0, s - 1))}
                  className={`px-4 py-2 rounded-xl font-bold text-xs border transition-all flex items-center gap-1.5 ${currentSlideIndex === 0 ? 'opacity-40 cursor-not-allowed bg-slate-200 dark:bg-slate-800 border-transparent text-slate-400' : dark ? 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700' : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 shadow-sm'}`}
                >
                  <ArrowLeft size={14} /> Précédent
                </button>
                <button
                  disabled={currentSlideIndex === slides.length - 1}
                  onClick={() => setCurrentSlideIndex(s => Math.min(slides.length - 1, s + 1))}
                  className={`px-4 py-2 rounded-xl font-bold text-xs border transition-all flex items-center gap-1.5 ${currentSlideIndex === slides.length - 1 ? 'opacity-40 cursor-not-allowed bg-slate-200 dark:bg-slate-800 border-transparent text-slate-400' : 'bg-accent text-slate-900 hover:scale-105 shadow-md border-accent'}`}
                >
                  Suivant <ArrowRight size={14} />
                </button>
              </div>
            </div>

            {/* Magnificent Slide Card with Rich Background & Smooth Animations */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlideIndex}
                initial={{ opacity: 0, scale: 0.96, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: -15 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className={`rounded-[36px] overflow-hidden border ${cardBg} shadow-2xl relative flex flex-col justify-between min-h-[520px]`}
              >
                {/* Stunning Decorative Background Gradients & Glows */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-accent/15 via-primary/10 to-transparent rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-gradient-to-tr from-indigo-500/10 via-accent/10 to-transparent rounded-full blur-3xl pointer-events-none" />

                {/* Slide Header Header Bar */}
                <div className="relative z-10 bg-gradient-to-r from-primary via-[#16294a] to-primary p-8 md:p-10 text-white shadow-md">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-extrabold uppercase tracking-widest bg-accent/20 border border-accent/30 text-accent px-3 py-1 rounded-full">
                      Cours Officiel
                    </span>
                    <span className="text-xs font-medium text-slate-300">
                      Slide {currentSlideIndex + 1} of {slides.length}
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-black tracking-tight leading-snug">
                    {slides[currentSlideIndex].title}
                  </h2>
                </div>

                {/* Slide Body Content */}
                <div className="relative z-10 p-6 md:p-12 flex-1 overflow-y-auto space-y-4">
                  <div 
                    style={{ fontSize: `${fontSize}px` }} 
                    className={`prose ${dark ? 'prose-invert' : ''} max-w-none leading-relaxed space-y-4 font-normal`}
                  >
                    <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
                      {slides[currentSlideIndex].content}
                    </ReactMarkdown>
                  </div>
                </div>

                {/* Slide Footer Navigation Bar */}
                <div className="relative z-10 px-8 py-5 border-t border-slate-200/60 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/50 flex items-center justify-between">
                  <span className={`text-xs font-semibold ${subText}`}>{username} • Cours Officiel</span>
                  <div className="flex items-center gap-3">
                    {currentSlideIndex === slides.length - 1 ? (
                      <button
                        onClick={() => setActiveTab('summary')}
                        className="px-6 py-3 bg-accent text-slate-900 rounded-2xl font-black shadow-lg hover:scale-105 transition-all flex items-center gap-2 text-xs md:text-sm cursor-pointer"
                      >
                        Consulter le Résumé Clé <ArrowRight size={16} />
                      </button>
                    ) : (
                      <button
                        onClick={() => setCurrentSlideIndex(s => s + 1)}
                        className="px-6 py-3 bg-primary text-white rounded-2xl font-bold hover:bg-primary-dark transition-all flex items-center gap-2 text-xs md:text-sm shadow-md cursor-pointer"
                      >
                        Diapositive suivante <ArrowRight size={16} />
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Slide Navigation Dots */}
            <div className="flex items-center justify-center gap-1.5 pt-2 flex-wrap max-w-xl mx-auto">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlideIndex(i)}
                  className={`h-2 rounded-full transition-all ${
                    currentSlideIndex === i 
                      ? 'w-8 bg-accent shadow-sm' 
                      : 'w-2 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400'
                  }`}
                  title={`Aller à la diapositive ${i + 1}`}
                />
              ))}
            </div>
          </div>
        )}

        {/* TAB 2 : RÉSUMÉ CLÉ */}
        {activeTab === 'summary' && (
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
            className={`rounded-[36px] border ${cardBg} shadow-2xl p-8 md:p-14 space-y-8`}
          >
            <div className="flex items-center gap-4 border-b pb-6 border-slate-200 dark:border-slate-800">
              <div className="p-4 bg-accent/10 border border-accent/30 rounded-2xl text-accent shadow-sm">
                <BookOpen size={32} />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-black">Résumé & Points Clés du Cours</h2>
                <p className={`text-sm ${subText}`}>L'essentiel à mémoriser pour réussir vos devoirs et examens officiels.</p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {summaryPoints.map((point, idx) => (
                <div key={idx} className={`p-5 rounded-2xl border ${dark ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50/80 border-slate-200'} flex items-start gap-4 shadow-sm hover:border-accent/50 transition-all`}>
                  <div className="w-8 h-8 rounded-xl bg-accent/20 border border-accent/30 text-accent font-black text-xs flex items-center justify-center shrink-0">
                    {idx + 1}
                  </div>
                  <p className="text-xs md:text-sm font-medium leading-relaxed">{point}</p>
                </div>
              ))}
            </div>

            <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex justify-center">
              <button
                onClick={() => setActiveTab('quiz')}
                className="px-8 py-4 bg-accent text-slate-900 font-black rounded-2xl shadow-xl hover:scale-105 transition-all flex items-center gap-2.5 text-sm md:text-base cursor-pointer"
              >
                🎯 Passer au Quiz d'Évaluation (10 questions) <ArrowRight size={18} />
              </button>
            </div>
          </motion.div>
        )}

        {/* TAB 3 : QUIZ D'ÉVALUATION (Magnificent Redesign) */}
        {activeTab === 'quiz' && (
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
            className={`rounded-[36px] border ${cardBg} shadow-2xl p-6 md:p-14 space-y-8`}
          >
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="text-xs font-extrabold uppercase tracking-widest text-accent bg-accent/10 px-4 py-1.5 rounded-full border border-accent/25 shadow-sm inline-block">
                Évaluation Officielle • 10 Questions • Noté sur 100
              </span>
              <h2 className="text-2xl md:text-4xl font-black">Quiz de Validation du Cours</h2>
              <p className={`text-xs md:text-sm ${subText} leading-relaxed`}>
                Règlement pédagogique : Un score minimal de <strong className="text-accent font-black">80/100</strong> est requis pour valider ce cours. En cas de score inférieur à 80, vous devrez reprendre le cours.
              </p>
            </div>

            {!quizSubmitted ? (
              <div className="space-y-6">
                {quizQuestions.map((q, qIdx) => (
                  <div key={qIdx} className={`p-6 md:p-8 rounded-3xl border ${dark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200/80'} space-y-5 shadow-sm`}>
                    <h3 className="font-bold text-sm md:text-base flex items-start gap-3.5">
                      <span className="w-7 h-7 rounded-xl bg-primary text-white font-black text-xs flex items-center justify-center shrink-0 shadow-sm">
                        {qIdx + 1}
                      </span>
                      <span className="leading-snug">{q.question}</span>
                    </h3>
                    <div className="grid gap-2.5 pl-10">
                      {q.options.map((opt, oIdx) => (
                        <label 
                          key={oIdx}
                          className={`flex items-center gap-3.5 p-3.5 rounded-2xl border cursor-pointer transition-all ${
                            quizAnswers[qIdx] === oIdx 
                              ? 'bg-accent/20 border-accent text-primary dark:text-accent font-bold shadow-md scale-[1.01]' 
                              : dark ? 'bg-slate-900/80 border-slate-700/80 hover:bg-slate-800 text-slate-300' : 'bg-white border-slate-200 hover:bg-slate-100 text-slate-700'
                          }`}
                        >
                          <input
                            type="radio"
                            name={`question-${qIdx}`}
                            checked={quizAnswers[qIdx] === oIdx}
                            onChange={() => {
                              const newAns = [...quizAnswers];
                              newAns[qIdx] = oIdx;
                              setQuizAnswers(newAns);
                            }}
                            className="accent-accent w-4 h-4"
                          />
                          <span className="text-xs md:text-sm font-medium">{opt}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}

                <div className="flex flex-col items-center justify-center pt-6 gap-3">
                  <button
                    onClick={handleQuizSubmit}
                    disabled={quizAnswers.includes(-1)}
                    className={`px-10 py-4 rounded-2xl font-black text-base shadow-2xl transition-all flex items-center gap-2.5 cursor-pointer ${
                      quizAnswers.includes(-1) 
                        ? 'opacity-40 cursor-not-allowed bg-slate-300 text-slate-600 dark:bg-slate-800 dark:text-slate-400' 
                        : 'bg-accent text-slate-900 hover:scale-105'
                    }`}
                  >
                    <CheckCircle size={20} /> Valider mes réponses et voir mon score
                  </button>
                  {quizAnswers.includes(-1) && (
                    <p className="text-xs text-amber-500 font-bold bg-amber-500/10 px-4 py-2 rounded-xl border border-amber-500/20">
                      ⚠️ Veuillez répondre aux 10 questions avant de soumettre.
                    </p>
                  )}
                </div>
              </div>
            ) : (
              /* QUIZ RESULT & VALIDATION SCREEN */
              <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="space-y-8 py-8 text-center max-w-lg mx-auto">
                <div className={`p-8 md:p-10 rounded-[36px] border shadow-2xl space-y-6 ${
                  quizScore >= 80 
                    ? 'bg-green-500/10 border-green-500/30 text-green-700 dark:text-green-300' 
                    : 'bg-red-500/10 border-red-500/30 text-red-700 dark:text-red-300'
                }`}>
                  <div className="w-24 h-24 mx-auto rounded-full flex items-center justify-center bg-white shadow-xl text-5xl">
                    {quizScore >= 80 ? '🏆' : '📚'}
                  </div>
                  <div>
                    <h3 className="text-3xl font-black tracking-tight">
                      {quizScore >= 80 ? "Félicitations !" : "Objectif Non Atteint"}
                    </h3>
                    <p className="text-5xl font-black my-3">{quizScore} <span className="text-xl font-bold opacity-75">/ 100</span></p>
                    <p className="text-xs md:text-sm font-semibold leading-relaxed opacity-95">
                      {quizScore >= 80 
                        ? "Excellent travail ! Vous avez atteint la moyenne minimale requise (80/100). Ce cours est officiellement validé !" 
                        : "La moyenne minimale requise pour valider ce cours est de 80/100. Vous devez revoir le diaporama et reprendre le quiz pour réussir."}
                    </p>
                  </div>

                  {quizScore >= 80 ? (
                    <div className="flex flex-col gap-3 pt-2">
                      <div className="flex items-center justify-center gap-2 px-6 py-3.5 bg-green-500 text-white rounded-2xl font-extrabold text-sm shadow-lg">
                        <Trophy size={18} /> Cours validé avec brio !
                      </div>
                      <button onClick={onClose} className="px-6 py-3.5 bg-primary text-white font-bold rounded-2xl hover:bg-primary-dark transition-all shadow-md cursor-pointer">
                        Retourner aux cours
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-3 pt-2">
                      <button
                        onClick={handleRetakeQuiz}
                        className="px-6 py-4 bg-red-600 text-white font-extrabold rounded-2xl shadow-xl hover:bg-red-700 transition-all flex items-center justify-center gap-2.5 text-sm cursor-pointer"
                      >
                        <RotateCcw size={18} /> Revoir le cours et recommencer le quiz
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        )}

      </main>
    </div>
  );
};
