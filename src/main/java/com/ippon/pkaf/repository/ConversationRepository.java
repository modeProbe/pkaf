package com.ippon.pkaf.repository;

import com.ippon.pkaf.domain.Conversation;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * Spring Data JPA repository for the Conversation entity.
 */
@SuppressWarnings("unused")
public interface ConversationRepository extends JpaRepository<Conversation,Long> {

    @Query("select distinct conversation from Conversation conversation left join fetch conversation.identities")
    List<Conversation> findAllWithEagerRelationships();

    @Query("select conversation from Conversation conversation left join fetch conversation.identities where conversation.id =:id")
    Conversation findOneWithEagerRelationships(@Param("id") Long id);

    @Query("select conversation from Conversation conversation left join conversation.identities where id in conversation.identities")
    List<Conversation> findAllConversationOfUser(@Param("id") Long id);

}
