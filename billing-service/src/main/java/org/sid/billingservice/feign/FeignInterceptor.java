package org.sid.billingservice.feign;

import feign.RequestInterceptor;
import feign.RequestTemplate;
import org.keycloak.KeycloakPrincipal;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import java.security.Principal;

@Component
public class FeignInterceptor implements RequestInterceptor {
    @Override
    public void apply(RequestTemplate requestTemplate) {

        // Lors de l'utilisation du Keycloak Adapter
        SecurityContext context = SecurityContextHolder.getContext();
        Authentication authentication = context.getAuthentication();
        Principal principal = (Principal) authentication.getPrincipal();
        KeycloakPrincipal keycloakPrincipal= (KeycloakPrincipal) principal;
        String accessToken = keycloakPrincipal.getKeycloakSecurityContext().getTokenString();
        requestTemplate.header("Authorization","Bearer "+accessToken);

        // Pour le cas de Spring security, sans Keycloak Adapter
        /*SecurityContext context = SecurityContextHolder.getContext();
        JwtAuthenticationToken authentication = (JwtAuthenticationToken) context.getAuthentication();
        String tokenValue = authentication.getToken().getTokenValue();
        requestTemplate.header("Authorization","Bearer "+tokenValue);*/
    }
}
