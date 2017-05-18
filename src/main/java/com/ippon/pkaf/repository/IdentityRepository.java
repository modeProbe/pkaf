package com.ippon.pkaf.repository;

import com.ippon.pkaf.domain.Identity;

import org.springframework.data.jpa.repository.*;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data JPA repository for the Identity entity.
 */
@SuppressWarnings("unused")
public interface IdentityRepository extends JpaRepository<Identity,Long> {

    Optional<Identity> findOneByUserLogin(String login);

    List<Identity> findByIdentityNameIsNot(String login);
}
