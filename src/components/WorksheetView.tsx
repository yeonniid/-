import React, { useState } from 'react';
import { WORKSHEET_QUESTIONS } from '../data/inquiryModules';
import { CheckCircle2, MapPin, XCircle } from 'lucide-react';

interface WorksheetViewProps {
  onJumpToMap: (preset: {
    regionId: string;
    focusCountryKey: string;
    baseLayer: 'climate' | 'water';
    showPork: boolean;
    showBeef: boolean;
    highlightExceptions: boolean;
  }) => void;
}

export const WorksheetView: React.FC<WorksheetViewProps> = ({ onJumpToMap }) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});

  const answeredCount = Object.keys(selectedAnswers).length;
  const correctCount = WORKSHEET_QUESTIONS.filter((q) => {
    const picked = selectedAnswers[q.id];
    return q.options.some((o) => o.id === picked && o.isCorrect);
  }).length;

  return (
    <div className="space-y-6">
      <section className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">스스로 확인하는 지리 탐구 워크시트</h2>
          <p className="mt-1 text-sm text-slate-600">
            세계지도 오버레이에서 관찰한 자연지리적 분포와 예외 사례를 바탕으로 4개의 탐구 문항을 해결해 보세요.
          </p>
        </div>
        <div className="flex items-center gap-4 shrink-0 text-xs">
          <div className="text-right">
            <div className="text-slate-500">풀이 현황</div>
            <div className="font-mono-num text-base font-bold text-slate-900">
              {answeredCount} / {WORKSHEET_QUESTIONS.length} 완료
              {answeredCount > 0 && (
                <span className="ml-2 text-sky-700">(정답 {correctCount}개)</span>
              )}
            </div>
          </div>
          {answeredCount > 0 && (
            <button
              type="button"
              onClick={() => setSelectedAnswers({})}
              className="px-3 py-1.5 font-medium text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
            >
              다시 풀기
            </button>
          )}
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {WORKSHEET_QUESTIONS.map((q) => {
          const pickedId = selectedAnswers[q.id];
          const pickedOption = q.options.find((o) => o.id === pickedId);

          return (
            <article
              key={q.id}
              className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs flex flex-col justify-between gap-4"
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-sm font-bold text-slate-900">{q.title}</h3>
                  <button
                    type="button"
                    onClick={() => onJumpToMap(q.inspectPreset)}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-sky-800 bg-sky-50 border border-sky-200 rounded-md hover:bg-sky-100 transition-colors whitespace-nowrap shrink-0"
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{q.inspectLabel}</span>
                  </button>
                </div>

                <p className="mt-3 text-sm text-slate-800 leading-relaxed font-medium">{q.prompt}</p>

                <div className="mt-4 space-y-2">
                  {q.options.map((opt) => {
                    const isPicked = pickedId === opt.id;
                    let borderClass = 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700';
                    if (isPicked && opt.isCorrect) {
                      borderClass = 'border-emerald-500 bg-emerald-50/70 text-emerald-950';
                    } else if (isPicked && !opt.isCorrect) {
                      borderClass = 'border-rose-400 bg-rose-50/70 text-rose-950';
                    }

                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setSelectedAnswers((prev) => ({ ...prev, [q.id]: opt.id }))}
                        className={`w-full text-left px-4 py-3 rounded-lg border text-xs leading-relaxed transition-colors flex items-start gap-2.5 ${borderClass}`}
                      >
                        <span className="font-mono-num font-bold uppercase shrink-0 mt-0.5">
                          {opt.id}.
                        </span>
                        <span className="flex-1">{opt.text}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {pickedOption && (
                <div
                  className={`p-3.5 rounded-lg border text-xs leading-relaxed flex items-start gap-2.5 ${
                    pickedOption.isCorrect
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                      : 'bg-rose-50 border-rose-200 text-rose-950'
                  }`}
                >
                  {pickedOption.isCorrect ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-4 h-4 text-rose-700 shrink-0 mt-0.5" />
                  )}
                  <p>{pickedOption.feedback}</p>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
};
