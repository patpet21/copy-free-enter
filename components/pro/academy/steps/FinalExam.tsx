
import React, { useState } from 'react';
import { Button } from '../../../ui/Button';

export const FinalExam: React.FC = () => {
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [currentQ, setCurrentQ] = useState(0);

  const questions = [
      {
          q: "What is the primary function of an SPV in tokenization?",
          options: ["To avoid all taxes", "To isolate liability and hold the asset", "To mint crypto coins", "To pay the developers"],
          correct: 1
      },
      {
          q: "Which Investor Type requires the LEAST regulatory friction in the US?",
          options: ["Retail", "Accredited", "Foreign Retail", "Anonymous"],
          correct: 1
      },
      {
          q: "What is 'NoI'?",
          options: ["Number of Investors", "Net Operating Income", "New Object Instance", "Network of Internet"],
          correct: 1
      },
      {
          q: "Why is ERC-3643 used over ERC-20?",
          options: ["It is cheaper", "It forces Identity/KYC checks on-chain", "It is faster", "It supports NFTs"],
          correct: 1
      }
  ];

  const handleAnswer = (idx: number) => {
      if (idx === questions[currentQ].correct) {
          setScore(s => s + 1);
      }
      
      if (currentQ < questions.length - 1) {
          setCurrentQ(q => q + 1);
      } else {
          setFinished(true);
      }
  };

  if (!started) {
      return (
          <div className="flex flex-col items-center justify-center min-h-[500px] text-center space-y-6 bg-slate-900 rounded-3xl border border-slate-800 p-10">
              <div className="text-6xl mb-4">🎓</div>
              <h1 className="text-4xl font-bold text-white font-display">Final Certification Exam</h1>
              <p className="text-slate-400 max-w-md mx-auto">
                  You have completed the theory modules. Prove your knowledge to unlock your "Tokenization Architect" certificate.
              </p>
              <div className="bg-slate-800 p-4 rounded-xl text-sm text-slate-300">
                  <p>• 10 Questions</p>
                  <p>• 80% Passing Score</p>
                  <p>• No Time Limit</p>
              </div>
              <Button onClick={() => setStarted(true)} className="px-10 py-4 text-lg shadow-xl shadow-indigo-500/20">
                  Start Exam
              </Button>
          </div>
      );
  }

  if (finished) {
      const passed = score >= 3;
      return (
          <div className="flex flex-col items-center justify-center min-h-[500px] text-center space-y-6 bg-slate-900 rounded-3xl border border-slate-800 p-10 animate-fadeIn">
              <div className="text-6xl mb-4">{passed ? '🏆' : '📚'}</div>
              <h1 className="text-4xl font-bold text-white font-display">
                  {passed ? 'Certified!' : 'Keep Studying'}
              </h1>
              <p className="text-slate-400 max-w-md mx-auto">
                  You scored <span className="text-white font-bold text-xl">{score} / {questions.length}</span>
              </p>
              
              {passed ? (
                  <div className="p-6 bg-gradient-to-r from-amber-200 to-yellow-400 rounded-xl text-slate-900 shadow-xl">
                      <h4 className="font-bold font-display text-xl uppercase tracking-widest mb-1">Certificate of Completion</h4>
                      <p className="text-sm font-serif">Awarded to Pro User</p>
                      <p className="text-[10px] uppercase mt-4 tracking-widest opacity-60">Verified on PropertyDEX</p>
                  </div>
              ) : (
                  <Button onClick={() => { setStarted(false); setScore(0); setCurrentQ(0); setFinished(false); }}>
                      Retake Exam
                  </Button>
              )}
          </div>
      );
  }

  return (
      <div className="max-w-2xl mx-auto bg-slate-900 rounded-3xl border border-slate-800 p-10 animate-slideUp">
          <div className="flex justify-between items-center mb-8">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Question {currentQ + 1} / {questions.length}</span>
              <span className="text-xs font-bold text-indigo-400">Exam In Progress</span>
          </div>
          
          <h3 className="text-2xl font-bold text-white mb-8 leading-relaxed">
              {questions[currentQ].q}
          </h3>

          <div className="space-y-4">
              {questions[currentQ].options.map((opt, i) => (
                  <button 
                      key={i}
                      onClick={() => handleAnswer(i)}
                      className="w-full text-left p-4 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 hover:bg-indigo-600 hover:text-white hover:border-indigo-500 transition-all font-medium"
                  >
                      {opt}
                  </button>
              ))}
          </div>
      </div>
  );
};
