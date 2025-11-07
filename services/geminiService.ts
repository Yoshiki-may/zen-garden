import type { GardenState } from '../types';

export async function generateGardenTheme(prompt: string): Promise<Omit<GardenState, 'key'>> {
  try {
    // AWSサーバー上のバックエンドAPIにリクエストを送信
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `サーバーエラーが発生しました (ステータス: ${response.status})`);
    }

    const data = await response.json();

    if (data.haiku && data.description) {
        // バックエンドから受け取った俳句の改行を整形
        data.haiku = data.haiku.replace(/\\n/g, '\n');
        return data;
    } else {
        throw new Error("バックエンドからの応答形式が正しくありません。");
    }

  } catch (error) {
    console.error("Error calling backend API:", error);
    if (error instanceof Error) {
        // エラーメッセージをUIに表示するために再スロー
        throw new Error(error.message);
    }
    throw new Error("庭のテーマを生成できませんでした。しばらくしてからもう一度お試しください。");
  }
}
