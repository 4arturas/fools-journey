"use client"

import Board from "@/app/components/board/Board";
import ReduxProvider from "@/store/redux-provider";
import AuthUpdater from "@/app/auth/auth-updater";
import AuthViewer from "@/app/auth/auth-viewer";

export default function Home() {

  return (
      <ReduxProvider>
          <main>
              <AuthUpdater/>
              <AuthViewer/>
              <Board/>
          </main>
      </ReduxProvider>
  );
}
