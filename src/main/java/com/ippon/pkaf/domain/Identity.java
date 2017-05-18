package com.ippon.pkaf.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Identity.
 */
@Entity
@Table(name = "identity")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Identity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "identity_name")
    private String identityName;

    @Column(name = "identity_password")
    private String identityPassword;

    @OneToOne
    @JoinColumn(unique = true)
    private User user;

    @OneToMany(mappedBy = "identity")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Message> senders = new HashSet<>();

    @ManyToMany(mappedBy = "identities")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Conversation> convs = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getIdentityName() {
        return identityName;
    }

    public Identity identityName(String identityName) {
        this.identityName = identityName;
        return this;
    }

    public void setIdentityName(String identityName) {
        this.identityName = identityName;
    }

    public String getIdentityPassword() {
        return identityPassword;
    }

    public Identity identityPassword(String identityPassword) {
        this.identityPassword = identityPassword;
        return this;
    }

    public void setIdentityPassword(String identityPassword) {
        this.identityPassword = identityPassword;
    }

    public User getUser() {
        return user;
    }

    public Identity user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Set<Message> getSenders() {
        return senders;
    }

    public Identity senders(Set<Message> messages) {
        this.senders = messages;
        return this;
    }

    public Identity addSender(Message message) {
        this.senders.add(message);
        message.setIdentity(this);
        return this;
    }

    public Identity removeSender(Message message) {
        this.senders.remove(message);
        message.setIdentity(null);
        return this;
    }

    public void setSenders(Set<Message> messages) {
        this.senders = messages;
    }

    public Set<Conversation> getConvs() {
        return convs;
    }

    public Identity convs(Set<Conversation> conversations) {
        this.convs = conversations;
        return this;
    }

    public Identity addConv(Conversation conversation) {
        this.convs.add(conversation);
        conversation.getIdentities().add(this);
        return this;
    }

    public Identity removeConv(Conversation conversation) {
        this.convs.remove(conversation);
        conversation.getIdentities().remove(this);
        return this;
    }

    public void setConvs(Set<Conversation> conversations) {
        this.convs = conversations;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Identity identity = (Identity) o;
        if (identity.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), identity.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Identity{" +
            "id=" + getId() +
            ", identityName='" + getIdentityName() + "'" +
            ", identityPassword='" + getIdentityPassword() + "'" +
            "}";
    }
}
