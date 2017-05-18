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
 * A Conversation.
 */
@Entity
@Table(name = "conversation")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Conversation implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "conv_name")
    private String convName;

    @OneToMany(mappedBy = "conv")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Message> messages = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "conversation_identity",
               joinColumns = @JoinColumn(name="conversations_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="identities_id", referencedColumnName="id"))
    private Set<Identity> identities = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getConvName() {
        return convName;
    }

    public Conversation convName(String convName) {
        this.convName = convName;
        return this;
    }

    public void setConvName(String convName) {
        this.convName = convName;
    }

    public Set<Message> getMessages() {
        return messages;
    }

    public Conversation messages(Set<Message> messages) {
        this.messages = messages;
        return this;
    }

    public Conversation addMessage(Message message) {
        this.messages.add(message);
        message.setConv(this);
        return this;
    }

    public Conversation removeMessage(Message message) {
        this.messages.remove(message);
        message.setConv(null);
        return this;
    }

    public void setMessages(Set<Message> messages) {
        this.messages = messages;
    }

    public Set<Identity> getIdentities() {
        return identities;
    }

    public Conversation identities(Set<Identity> identities) {
        this.identities = identities;
        return this;
    }

    public Conversation addIdentity(Identity identity) {
        this.identities.add(identity);
        identity.getConvs().add(this);
        return this;
    }

    public Conversation removeIdentity(Identity identity) {
        this.identities.remove(identity);
        identity.getConvs().remove(this);
        return this;
    }

    public void setIdentities(Set<Identity> identities) {
        this.identities = identities;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Conversation conversation = (Conversation) o;
        if (conversation.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), conversation.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Conversation{" +
            "id=" + getId() +
            ", convName='" + getConvName() + "'" +
            "}";
    }
}
