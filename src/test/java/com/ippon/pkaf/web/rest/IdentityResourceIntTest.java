package com.ippon.pkaf.web.rest;

import com.ippon.pkaf.PkafApp;

import com.ippon.pkaf.domain.Identity;
import com.ippon.pkaf.repository.IdentityRepository;
import com.ippon.pkaf.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the IdentityResource REST controller.
 *
 * @see IdentityResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PkafApp.class)
public class IdentityResourceIntTest {

    private static final String DEFAULT_IDENTITY_NAME = "AAAAAAAAAA";
    private static final String UPDATED_IDENTITY_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_IDENTITY_PASSWORD = "AAAAAAAAAA";
    private static final String UPDATED_IDENTITY_PASSWORD = "BBBBBBBBBB";

    @Autowired
    private IdentityRepository identityRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restIdentityMockMvc;

    private Identity identity;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        IdentityResource identityResource = new IdentityResource(identityRepository);
        this.restIdentityMockMvc = MockMvcBuilders.standaloneSetup(identityResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Identity createEntity(EntityManager em) {
        Identity identity = new Identity()
            .identityName(DEFAULT_IDENTITY_NAME)
            .identityPassword(DEFAULT_IDENTITY_PASSWORD);
        return identity;
    }

    @Before
    public void initTest() {
        identity = createEntity(em);
    }

    @Test
    @Transactional
    public void createIdentity() throws Exception {
        int databaseSizeBeforeCreate = identityRepository.findAll().size();

        // Create the Identity
        restIdentityMockMvc.perform(post("/api/identities")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(identity)))
            .andExpect(status().isCreated());

        // Validate the Identity in the database
        List<Identity> identityList = identityRepository.findAll();
        assertThat(identityList).hasSize(databaseSizeBeforeCreate + 1);
        Identity testIdentity = identityList.get(identityList.size() - 1);
        assertThat(testIdentity.getIdentityName()).isEqualTo(DEFAULT_IDENTITY_NAME);
        assertThat(testIdentity.getIdentityPassword()).isEqualTo(DEFAULT_IDENTITY_PASSWORD);
    }

    @Test
    @Transactional
    public void createIdentityWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = identityRepository.findAll().size();

        // Create the Identity with an existing ID
        identity.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restIdentityMockMvc.perform(post("/api/identities")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(identity)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<Identity> identityList = identityRepository.findAll();
        assertThat(identityList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllIdentities() throws Exception {
        // Initialize the database
        identityRepository.saveAndFlush(identity);

        // Get all the identityList
        restIdentityMockMvc.perform(get("/api/identities?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(identity.getId().intValue())))
            .andExpect(jsonPath("$.[*].identityName").value(hasItem(DEFAULT_IDENTITY_NAME.toString())))
            .andExpect(jsonPath("$.[*].identityPassword").value(hasItem(DEFAULT_IDENTITY_PASSWORD.toString())));
    }

    @Test
    @Transactional
    public void getIdentity() throws Exception {
        // Initialize the database
        identityRepository.saveAndFlush(identity);

        // Get the identity
        restIdentityMockMvc.perform(get("/api/identities/{id}", identity.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(identity.getId().intValue()))
            .andExpect(jsonPath("$.identityName").value(DEFAULT_IDENTITY_NAME.toString()))
            .andExpect(jsonPath("$.identityPassword").value(DEFAULT_IDENTITY_PASSWORD.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingIdentity() throws Exception {
        // Get the identity
        restIdentityMockMvc.perform(get("/api/identities/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateIdentity() throws Exception {
        // Initialize the database
        identityRepository.saveAndFlush(identity);
        int databaseSizeBeforeUpdate = identityRepository.findAll().size();

        // Update the identity
        Identity updatedIdentity = identityRepository.findOne(identity.getId());
        updatedIdentity
            .identityName(UPDATED_IDENTITY_NAME)
            .identityPassword(UPDATED_IDENTITY_PASSWORD);

        restIdentityMockMvc.perform(put("/api/identities")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedIdentity)))
            .andExpect(status().isOk());

        // Validate the Identity in the database
        List<Identity> identityList = identityRepository.findAll();
        assertThat(identityList).hasSize(databaseSizeBeforeUpdate);
        Identity testIdentity = identityList.get(identityList.size() - 1);
        assertThat(testIdentity.getIdentityName()).isEqualTo(UPDATED_IDENTITY_NAME);
        assertThat(testIdentity.getIdentityPassword()).isEqualTo(UPDATED_IDENTITY_PASSWORD);
    }

    @Test
    @Transactional
    public void updateNonExistingIdentity() throws Exception {
        int databaseSizeBeforeUpdate = identityRepository.findAll().size();

        // Create the Identity

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restIdentityMockMvc.perform(put("/api/identities")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(identity)))
            .andExpect(status().isCreated());

        // Validate the Identity in the database
        List<Identity> identityList = identityRepository.findAll();
        assertThat(identityList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteIdentity() throws Exception {
        // Initialize the database
        identityRepository.saveAndFlush(identity);
        int databaseSizeBeforeDelete = identityRepository.findAll().size();

        // Get the identity
        restIdentityMockMvc.perform(delete("/api/identities/{id}", identity.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Identity> identityList = identityRepository.findAll();
        assertThat(identityList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Identity.class);
        Identity identity1 = new Identity();
        identity1.setId(1L);
        Identity identity2 = new Identity();
        identity2.setId(identity1.getId());
        assertThat(identity1).isEqualTo(identity2);
        identity2.setId(2L);
        assertThat(identity1).isNotEqualTo(identity2);
        identity1.setId(null);
        assertThat(identity1).isNotEqualTo(identity2);
    }
}
