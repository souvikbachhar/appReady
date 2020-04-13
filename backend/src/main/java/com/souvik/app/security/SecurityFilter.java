package com.souvik.app.security;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.Iterator;
import java.util.StringTokenizer;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.io.IOUtils;
import org.apache.tomcat.util.codec.binary.Base64;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

@Component
//@Order(Ordered.HIGHEST_PRECEDENCE)
public class SecurityFilter implements Filter {

	private static final Logger LOGGER = LoggerFactory.getLogger(SecurityFilter.class);

	private String username = "a";

	private String password = "a";

	private String realm = "Protected";

	private String secretKey = "souvik";

	@Override
	public void destroy() {
	}

	@Override
	public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain)
			throws IOException, ServletException {

		// HttpServletRequest request = (HttpServletRequest) servletRequest;
		XSSRequestWrapper wrappedRequest = new XSSRequestWrapper((HttpServletRequest) servletRequest);
		HttpServletResponse response = (HttpServletResponse) servletResponse;
		try {
			String authHeader = wrappedRequest.getHeader("Authorization");
			if (authHeader != null) {
				StringTokenizer st = new StringTokenizer(authHeader);
				if (st.hasMoreTokens()) {
					String basic = st.nextToken();

					if (basic.equalsIgnoreCase("Basic")) {
						try {
							String credentials = new String(Base64.decodeBase64(st.nextToken()), "UTF-8");
							LOGGER.info("Creds: " + credentials);
							int p = credentials.indexOf(":");
							if (p != -1) {
								String _username = credentials.substring(0, p).trim();
								String _password = credentials.substring(p + 1).trim();

								if (!username.equals(_username) || !password.equals(_password)) {
									unauthorized(response,
											"Unauthorized attempt,issue will be logged and sent to concerned team");
								}else{
									String body = IOUtils.toString(wrappedRequest.getReader());
									if (!"".equals(body)) {
										String decryptedBody=AESDecryptor.decryptText(body, secretKey);
										if(decryptedBody==null){
											unauthorized(response,"Unauthorized attempt,issue will be logged and sent to concerned team");
											
										}else{
											wrappedRequest.resetInputStream(decryptedBody.getBytes()); 
											filterChain.doFilter(wrappedRequest, response);
										}
									}
								}
								/*
								 * String body =
								 * IOUtils.toString(wrappedRequest.getReader());
								 * 
								 * if (!"".equals(body)) { JSONObject
								 * oldJsonObject = new JSONObject(body);
								 * JSONObject newJsonObject = new JSONObject();
								 * Iterator<String> keys = oldJsonObject.keys();
								 * while(keys.hasNext()) { String key =
								 * keys.next(); if (oldJsonObject.get(key)
								 * instanceof JSONObject) {
								 * newJsonObject.put(key,
								 * AESDecryptor.decryptText(oldJsonObject.get(
								 * key).toString(),secretKey)); } }
								 * wrappedRequest.resetInputStream(newJsonObject
								 * .toString().getBytes()); }
								 */								
								
							} else {
								unauthorized(response, "Invalid authentication token");
							}
						} catch (UnsupportedEncodingException e) {
							unauthorized(response);
							throw new Error("Couldn't retrieve authentication", e);
						}
					}
				}
			} else {
				unauthorized(response);
			}

			/*
			 * ServletRequest myrequest = new
			 * RequestWrapper(httpServletRequest);
			 * filterChain.doFilter(myrequest, response);
			 */

		} catch (Exception e) {
			filterChain.doFilter(servletRequest, response);
			unauthorized(response);
		}

	}

	@Override
	public void init(FilterConfig arg0) throws ServletException {

	}

	private void unauthorized(HttpServletResponse response, String message) throws IOException {
		response.setHeader("WWW-Authenticate", "Basic realm=\"" + realm + "\"");
		response.sendError(401, message);
	}

	private void unauthorized(HttpServletResponse response) throws IOException {
		unauthorized(response, "Unauthorized");
	}
}
