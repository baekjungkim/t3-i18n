import { useState } from "react";
import { type GetServerSideProps, type NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

import { api } from "~/utils/api";
import { useSession } from "next-auth/react";

const Home: NextPage = () => {
  const router = useRouter();
  const { data } = useSession();
  const { t, i18n } = useTranslation();
  const [message, setMessage] = useState({ message: "" });
  const { mutateAsync, isLoading } = api.example.getMessage.useMutation();

  const handleClick = async () => {
    const fetchedMessage = await mutateAsync();
    setMessage(fetchedMessage);
  };

  return (
    <div>
      <p>{t("common:hello-frontend")}</p>
      <button onClick={() => void handleClick()} disabled={isLoading}>
        {t("common:get-message")}
      </button>
      <button
        onClick={() =>
          void router.push(router.pathname, router.asPath, {
            locale: i18n.language === "ko" ? "en" : "ko",
          })
        }
      >
        {t("common:switch-language")}
      </button>
      <p>{JSON.stringify(message)}</p>
      <p>{JSON.stringify(data)}</p>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale as string, ["common"])),
    },
  };
};

export default Home;
