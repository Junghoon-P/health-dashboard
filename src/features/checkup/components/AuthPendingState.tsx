import { useState, useEffect } from "react";

interface AuthPendingStateProps {
  onCompleteAuth: () => void;
  onCancel: () => void;
  isLoading: boolean;
}

const AuthPendingState = ({
  onCompleteAuth,
  onCancel,
  isLoading,
}: AuthPendingStateProps) => {
  const [timeLeft, setTimeLeft] = useState(270); // 4분 30초 = 270초
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    if (timeLeft <= 0) {
      setIsExpired(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsExpired(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}분 ${remainingSeconds.toString().padStart(2, "0")}초`;
  };

  return (
    <div className="rounded-2xl border bg-white shadow-sm">
      <div className="px-6 py-4 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900">
          간편인증 진행 중
        </h2>
      </div>
      <div className="px-6 py-6">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-yellow-800 mb-2">
            간편인증 대기 중
          </h3>
          <p className="text-yellow-700 mb-4">
            선택하신 간편인증 앱에서 본인인증을 완료해주세요.
            <br />
            {isExpired ? (
              <span className="text-red-600 font-semibold">
                인증 시간이 만료되었습니다
              </span>
            ) : (
              <span>인증 완료 시간: {formatTime(timeLeft)}</span>
            )}
          </p>
          <div className="flex gap-2">
            <button
              onClick={onCompleteAuth}
              disabled={isLoading}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 font-medium"
            >
              {isLoading ? "확인 중..." : "인증 완료 확인"}
            </button>
            <button
              onClick={onCancel}
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 font-medium"
            >
              취소
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPendingState;
