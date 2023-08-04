package com.fourttttty.corookie.thread.application.repository;

import com.fourttttty.corookie.thread.domain.Thread;
import com.fourttttty.corookie.thread.infrastructure.ThreadJpaRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class ThreadRepositoryImpl implements ThreadRepository {

    private final ThreadJpaRepository threadJpaRepository;

    @Override
    public Thread save(Thread thread) {
        return threadJpaRepository.save(thread);
    }

    @Override
    public Optional<Thread> findById(Long threadId) {
        return threadJpaRepository.findById(threadId);
    }

    @Override
    public List<Thread> findAll(Long textChannelId) {
        return threadJpaRepository.findByTextChannelId(textChannelId);
    }
}