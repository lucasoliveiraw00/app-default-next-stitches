import { getSession } from '../../session';

import { getPropertyDescriptorForReqSession } from '../../../utils/property-descriptor-session';

import {
  PREFIX_BASE_AUTH,
  PREFIX_BASE_PERMISSION,
} from '../../../constants/session';

import { PublicPages } from '../../config/types';
import { Session, SessionUser, SessionPermission } from '../../types';

import { SessionProps } from './types';

function isPublicPage(
  publicPage: PublicPages,
  currentPage: string | undefined,
) {
  const result = Object.keys(publicPage).find(item => {
    const publicUrl = publicPage[item] || undefined;
    if (!publicUrl || !currentPage) return false;
    const updatedPublicUrl = publicUrl.replace(/\/(\d*)(\d*)/, '$2');
    const currentUrl = currentPage.replace(/\/(\d*)(\d*)/, '$2');
    return currentUrl === updatedPublicUrl;
  });
  return !!result;
}

export async function session(props: SessionProps) {
  const { request, response, configAuth, callback } = props;
  const { originUrl, defaultPages, publicPages } = configAuth;
  const isCurrentPublicPage = isPublicPage(publicPages, originUrl);
  const { signIn: pageSignIn, default: pageDefault } = defaultPages;

  try {
    request.cookies = {
      ...request.cookies,
      ...request.body,
    };

    const user = await getSession<SessionUser>(PREFIX_BASE_AUTH, request);

    const permissions = await getSession<SessionPermission>(
      PREFIX_BASE_PERMISSION,
      request,
    );

    const sessionData: Session = { user, permissions };

    Object.defineProperty(
      request,
      'session',
      getPropertyDescriptorForReqSession(sessionData),
    );
    if (callback) callback(request, response);

    const isAccessToPublicPageWithoutAuthentication =
      !user && isCurrentPublicPage;
    if (isAccessToPublicPageWithoutAuthentication) {
      return response.status(200).json({
        isAuthenticated: false,
        session: sessionData,
        redirect: false,
        defaultPages,
      });
    }

    const isAccessToThePrivatePageWithoutAuthentication =
      !user && !isCurrentPublicPage;
    if (isAccessToThePrivatePageWithoutAuthentication) {
      return response.status(200).json({
        isAuthenticated: false,
        session: sessionData,
        redirect: pageSignIn,
        defaultPages,
      });
    }

    const isAccessToThePrivatePageWithAuthentication = isCurrentPublicPage;
    if (isAccessToThePrivatePageWithAuthentication) {
      return response.status(200).json({
        isAuthenticated: true,
        session: request.session,
        redirect: pageDefault,
        defaultPages,
      });
    }

    return response.status(200).json({
      isAuthenticated: true,
      session: request.session,
      redirect: false,
      defaultPages,
    });
  } catch (error) {
    return response.status(200).json({
      isAuthenticated: false,
      session: undefined,
      redirect: isCurrentPublicPage ? false : pageSignIn,
      defaultPages,
    });
  }
}
